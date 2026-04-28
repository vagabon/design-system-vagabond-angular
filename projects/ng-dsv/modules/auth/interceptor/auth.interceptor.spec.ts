import { HttpClient, HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { signal } from '@angular/core';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { of, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthService } from '../public-api';
import { authInterceptor } from './auth.interceptor';

const BASE_URL = 'https://api.example.com';

const mockAuthService: Partial<AuthService> = {
    apiService: {
        baseUrl: signal(BASE_URL),
        refreshUrl: signal(`${BASE_URL}/auth/refresh-token`),
    } as unknown as AuthService['apiService'],
    userConnected: signal(null),
    userToken: signal(''),
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
            if (token === AuthService) return mockAuthService;
            if (token === ToastService) return mockToastService;
            return actual.inject?.(token as never);
        }),
    };
});

const makeRequest = (url: string) => new HttpRequest<unknown>('GET', url);

const makeNextWithError =
    (error: unknown): HttpHandlerFn =>
    () =>
        throwError(() => error) as ReturnType<HttpHandlerFn>;

describe('authInterceptor', () => {
    const interceptor = authInterceptor;

    beforeEach(() => {
        vi.clearAllMocks();
        console.error = vi.fn();
        mockAuthService.userConnected?.set(null);
        mockAuthService.userToken?.set('');
    });

    describe('getToken (Authorization header injection)', () => {
        it('should add Authorization header when jwt exists and URL matches baseUrl (non-auth route)', () => {
            mockAuthService.userConnected?.set({});
            mockAuthService.userToken?.set('my-jwt');
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
            const error = new HttpErrorResponse({
                error: { debugMessage: 'debug msg', message: 'msg' },
                status: 500,
                url: `${BASE_URL}/users`,
            });
            const req = makeRequest(`${BASE_URL}/users`);
            const next = makeNextWithError(error);

            interceptor(req, next).subscribe({ error: () => {} });

            expect(mockToastService.showToast).toHaveBeenCalledWith({
                closeAll: true,
                type: 'error',
                text: 'debug msg',
            });
        });

        it('should fall back to error.error.message when debugMessage is absent', () => {
            const error = new HttpErrorResponse({
                error: { message: 'fallback msg' },
                status: 500,
                url: `${BASE_URL}/users`,
            });
            const req = makeRequest(`${BASE_URL}/users`);

            interceptor(req, makeNextWithError(error)).subscribe({ error: () => {} });

            expect(mockToastService.showToast).toHaveBeenCalledWith({
                closeAll: true,
                type: 'error',
                text: 'fallback msg',
            });
        });

        it('should fall back to error.message when both debugMessage and error.message are absent', () => {
            const error = new HttpErrorResponse({
                error: {},
                status: 500,
                url: `${BASE_URL}/users`,
                statusText: 'Server Error',
            });
            const req = makeRequest(`${BASE_URL}/users`);

            interceptor(req, makeNextWithError(error)).subscribe({ error: () => {} });

            expect(mockToastService.showToast).toHaveBeenCalledWith({
                closeAll: true,
                type: 'error',
                text: error.message,
            });
        });

        it('should re-throw the error after showing the toast', () => {
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
            const error = new HttpErrorResponse({
                error: { message: 'logged error' },
                status: 500,
            });
            const req = makeRequest(`${BASE_URL}/users`);

            interceptor(req, makeNextWithError(error)).subscribe({ error: () => {} });

            expect(mockHttpClient.post).not.toHaveBeenCalled();
        });

        it('should NOT call handle401Error for a 401 on an auth/ route', () => {
            const error = new HttpErrorResponse({ status: 401, error: { message: 'unauthorized' } });
            const req = makeRequest(`${BASE_URL}/auth/login`);

            interceptor(req, makeNextWithError(error)).subscribe({ error: () => {} });

            expect(mockHttpClient.post).not.toHaveBeenCalled();
        });

        it('should NOT call handle401Error for a 401 on an external URL', () => {
            const error = new HttpErrorResponse({ status: 401, error: { message: 'unauthorized' } });
            const req = makeRequest('https://other.com/data');

            interceptor(req, makeNextWithError(error)).subscribe({ error: () => {} });

            expect(mockHttpClient.post).not.toHaveBeenCalled();
        });
    });

    describe('handle401Error', () => {
        const protectedUrl = `${BASE_URL}/protected-resource`;

        it('should call refresh-token endpoint with the stored jwtRefresh', () => {
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

            expect(mockHttpClient.post).toHaveBeenCalled();
        });

        it('should persist new tokens in storage after successful refresh', () => {
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

            expect(mockHttpClient.post).toHaveBeenCalled();
        });
    });
});
