import { HttpClient, HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';
import { of, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiService, authInterceptor } from '../public-api';

const BASE_URL = 'https://api.example.com';

const mockApiService: Partial<ApiService> = { baseUrl: BASE_URL };

const mockStorageService = {
    suffixe: { set: vi.fn() },
    getItem: vi.fn(),
    setItem: vi.fn(),
};

const mockToastService: Partial<ToastService> = {
    showToast: vi.fn(),
};

const mockHttpClient = {
    post: vi.fn(),
};

vi.mock('@angular/core', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@angular/core')>();
    return {
        ...actual,
        inject: vi.fn((token: unknown) => {
            if (token === HttpClient) return mockHttpClient;
            if (token === ApiService) return mockApiService;
            if (token === StorageService) return mockStorageService;
            if (token === ToastService) return mockToastService;
            return actual.inject?.(token as never);
        }),
    };
});

const makeRequest = (url: string) => new HttpRequest<unknown>('GET', url);

const makeNext =
    (response: unknown = {}): HttpHandlerFn =>
    (req) =>
        of(response) as ReturnType<HttpHandlerFn>;

const makeNextWithError =
    (error: unknown): HttpHandlerFn =>
    () =>
        throwError(() => error) as ReturnType<HttpHandlerFn>;

const userConnected = (jwt: string | null, jwtRefresh?: string) =>
    JSON.stringify({ jwt, jwtRefresh: jwtRefresh ?? 'refresh-token' });

describe('authInterceptor', () => {
    const SUFFIX = 'test';
    const interceptor = authInterceptor(SUFFIX);

    beforeEach(() => {
        vi.clearAllMocks();
        console.error = vi.fn();
    });

    describe('initialisation', () => {
        it('should set the suffixe on the storage service', () => {
            mockStorageService.getItem.mockReturnValue(null);
            const req = makeRequest('https://other.com/data');
            const next = makeNext();

            interceptor(req, next).subscribe();

            expect(mockStorageService.suffixe.set).toHaveBeenCalledWith(SUFFIX);
        });
    });

    describe('getToken (Authorization header injection)', () => {
        it('should add Authorization header when jwt exists and URL matches baseUrl (non-auth route)', () => {
            mockStorageService.getItem.mockReturnValue(userConnected('my-jwt'));
            const req = makeRequest(`${BASE_URL}/users`);

            let capturedReq: HttpRequest<unknown> | undefined;
            const next: HttpHandlerFn = (r) => {
                capturedReq = r as HttpRequest<unknown>;
                return of({}) as ReturnType<HttpHandlerFn>;
            };

            interceptor(req, next).subscribe();

            expect(capturedReq?.headers.get('Authorization')).toBe('Bearer my-jwt');
        });

        it('should NOT add Authorization header when URL contains /auth/', () => {
            mockStorageService.getItem.mockReturnValue(userConnected('my-jwt'));
            const req = makeRequest(`${BASE_URL}/auth/login`);

            let capturedReq: HttpRequest<unknown> | undefined;
            const next: HttpHandlerFn = (r) => {
                capturedReq = r as HttpRequest<unknown>;
                return of({}) as ReturnType<HttpHandlerFn>;
            };

            interceptor(req, next).subscribe();

            expect(capturedReq?.headers.get('Authorization')).toBeNull();
        });

        it('should NOT add Authorization header when URL does not match baseUrl', () => {
            mockStorageService.getItem.mockReturnValue(userConnected('my-jwt'));
            const req = makeRequest('https://other.com/data');

            let capturedReq: HttpRequest<unknown> | undefined;
            const next: HttpHandlerFn = (r) => {
                capturedReq = r as HttpRequest<unknown>;
                return of({}) as ReturnType<HttpHandlerFn>;
            };

            interceptor(req, next).subscribe();

            expect(capturedReq?.headers.get('Authorization')).toBeNull();
        });

        it('should NOT add Authorization header when jwt is null/absent in storage', () => {
            mockStorageService.getItem.mockReturnValue(null);
            const req = makeRequest(`${BASE_URL}/users`);

            let capturedReq: HttpRequest<unknown> | undefined;
            const next: HttpHandlerFn = (r) => {
                capturedReq = r as HttpRequest<unknown>;
                return of({}) as ReturnType<HttpHandlerFn>;
            };

            interceptor(req, next).subscribe();

            expect(capturedReq?.headers.get('Authorization')).toBeNull();
        });

        it('should NOT add Authorization header when jwt is falsy (empty string)', () => {
            mockStorageService.getItem.mockReturnValue(userConnected(''));
            const req = makeRequest(`${BASE_URL}/users`);

            let capturedReq: HttpRequest<unknown> | undefined;
            const next: HttpHandlerFn = (r) => {
                capturedReq = r as HttpRequest<unknown>;
                return of({}) as ReturnType<HttpHandlerFn>;
            };

            interceptor(req, next).subscribe();

            expect(capturedReq?.headers.get('Authorization')).toBeNull();
        });
    });

    describe('catchError – non-401 errors', () => {
        it('should show a toast with debugMessage when available', () => {
            mockStorageService.getItem.mockReturnValue(null);
            const error = new HttpErrorResponse({
                error: { debugMessage: 'debug msg', message: 'msg' },
                status: 500,
                url: `${BASE_URL}/users`,
            });
            const req = makeRequest(`${BASE_URL}/users`);
            const next = makeNextWithError(error);

            interceptor(req, next).subscribe({ error: () => {} });

            expect(mockToastService.showToast).toHaveBeenCalledWith({
                type: 'error',
                text: 'debug msg',
            });
        });

        it('should fall back to error.error.message when debugMessage is absent', () => {
            mockStorageService.getItem.mockReturnValue(null);
            const error = new HttpErrorResponse({
                error: { message: 'fallback msg' },
                status: 500,
                url: `${BASE_URL}/users`,
            });
            const req = makeRequest(`${BASE_URL}/users`);

            interceptor(req, makeNextWithError(error)).subscribe({ error: () => {} });

            expect(mockToastService.showToast).toHaveBeenCalledWith({
                type: 'error',
                text: 'fallback msg',
            });
        });

        it('should fall back to error.message when both debugMessage and error.message are absent', () => {
            mockStorageService.getItem.mockReturnValue(null);
            const error = new HttpErrorResponse({
                error: {},
                status: 500,
                url: `${BASE_URL}/users`,
                statusText: 'Server Error',
            });
            const req = makeRequest(`${BASE_URL}/users`);

            interceptor(req, makeNextWithError(error)).subscribe({ error: () => {} });

            expect(mockToastService.showToast).toHaveBeenCalledWith({
                type: 'error',
                text: error.message,
            });
        });

        it('should re-throw the error after showing the toast', () => {
            mockStorageService.getItem.mockReturnValue(null);
            const error = new HttpErrorResponse({
                error: { message: 'some error' },
                status: 500,
                url: `${BASE_URL}/users`,
            });
            const req = makeRequest(`${BASE_URL}/users`);

            let caughtError: unknown;
            interceptor(req, makeNextWithError(error)).subscribe({
                error: (e: Error) => {
                    caughtError = e;
                },
            });

            expect(caughtError).toBe(error);
        });

        it('should log the error to console.error', () => {
            mockStorageService.getItem.mockReturnValue(null);
            const error = new HttpErrorResponse({
                error: { message: 'logged error' },
                status: 500,
            });
            const req = makeRequest(`${BASE_URL}/users`);

            interceptor(req, makeNextWithError(error)).subscribe({ error: () => {} });

            expect(console.error).toHaveBeenCalledWith(error);
        });

        it('should NOT call handle401Error for a 401 on an auth/ route', () => {
            mockStorageService.getItem.mockReturnValue(userConnected('jwt'));
            const error = new HttpErrorResponse({ status: 401, error: { message: 'unauthorized' } });
            const req = makeRequest(`${BASE_URL}/auth/login`);

            interceptor(req, makeNextWithError(error)).subscribe({ error: () => {} });

            expect(mockHttpClient.post).not.toHaveBeenCalled();
        });

        it('should NOT call handle401Error for a 401 on an external URL', () => {
            mockStorageService.getItem.mockReturnValue(null);
            const error = new HttpErrorResponse({ status: 401, error: { message: 'unauthorized' } });
            const req = makeRequest('https://other.com/data');

            interceptor(req, makeNextWithError(error)).subscribe({ error: () => {} });

            expect(mockHttpClient.post).not.toHaveBeenCalled();
        });
    });

    describe('handle401Error', () => {
        const protectedUrl = `${BASE_URL}/protected-resource`;

        it('should call refresh-token endpoint with the stored jwtRefresh', () => {
            mockStorageService.getItem.mockReturnValue(userConnected('old-jwt', 'my-refresh-token'));
            const refreshResponse = { jwt: 'new-jwt', jwtRefresh: 'new-refresh' };
            mockHttpClient.post.mockReturnValue(of(refreshResponse));

            const req = makeRequest(protectedUrl);
            const error = new HttpErrorResponse({ status: 401, error: {} });

            let callCount = 0;
            const next: HttpHandlerFn = () => {
                callCount++;
                if (callCount === 1) return throwError(() => error) as ReturnType<HttpHandlerFn>;
                return of({}) as ReturnType<HttpHandlerFn>;
            };

            interceptor(req, next).subscribe({ error: () => {} });

            expect(mockHttpClient.post).toHaveBeenCalledWith(`${BASE_URL}/auth/refresh-token`, {
                refreshToken: 'my-refresh-token',
            });
        });

        it('should persist new tokens in storage after successful refresh', () => {
            const refreshResponse = { jwt: 'new-jwt', jwtRefresh: 'new-refresh' };
            mockStorageService.getItem.mockReturnValue(userConnected('old-jwt', 'old-refresh'));
            mockHttpClient.post.mockReturnValue(of(refreshResponse));

            const req = makeRequest(protectedUrl);
            const error = new HttpErrorResponse({ status: 401, error: {} });

            let callCount = 0;
            const next: HttpHandlerFn = () => {
                callCount++;
                if (callCount === 1) return throwError(() => error) as ReturnType<HttpHandlerFn>;
                return of({}) as ReturnType<HttpHandlerFn>;
            };

            interceptor(req, next).subscribe({ error: () => {} });

            expect(mockStorageService.setItem).toHaveBeenCalledWith(
                'user-connected',
                JSON.stringify(refreshResponse),
            );
        });

        it('should retry the original request with the new jwt after refresh', () => {
            const refreshResponse = { jwt: 'new-jwt', jwtRefresh: 'new-refresh' };
            mockStorageService.getItem
                .mockReturnValueOnce(userConnected('old-jwt', 'old-refresh'))
                .mockReturnValue(JSON.stringify(refreshResponse));

            mockHttpClient.post.mockReturnValue(of(refreshResponse));

            const req = makeRequest(protectedUrl);
            const error = new HttpErrorResponse({ status: 401, error: {} });

            let callCount = 0;
            let lastReq: HttpRequest<unknown> | undefined;
            const next: HttpHandlerFn = (r) => {
                callCount++;
                lastReq = r as HttpRequest<unknown>;
                if (callCount === 1) return throwError(() => error) as ReturnType<HttpHandlerFn>;
                return of({}) as ReturnType<HttpHandlerFn>;
            };

            interceptor(req, next).subscribe();

            expect(lastReq?.headers.get('Authorization')).toBe('Bearer new-jwt');
        });
    });
});
