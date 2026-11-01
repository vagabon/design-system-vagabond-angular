import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../public-api';

let isRefreshing = false;
let isRefreshRejected = false;
const refreshSubject$ = new BehaviorSubject<string | null>(null);

export const authInterceptor = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
    const httpClient = inject(HttpClient);
    const authService = inject(AuthService);
    const toastService = inject(ToastService);

    return next(getToken(request, authService)).pipe(
        catchError((error) => {
            if (
                error instanceof HttpErrorResponse &&
                !request.url.includes('auth/') &&
                (request.url.includes(authService.apiService.baseUrl()) ||
                    request.url.includes(authService.apiService.baseGwUrl())) &&
                error.status === 401 &&
                !isRefreshRejected
            ) {
                return handle401Error(httpClient, authService, request, next);
            }

            let errorMessage = error.error?.debugMessage ?? error.error?.message ?? error.message;

            if (
                errorMessage === 'fetch failed' ||
                errorMessage === 'Failed to fetch' ||
                errorMessage.endsWith(': 500 Internal Server Error')
            ) {
                errorMessage = 'Api indisponible';
            }
            if (!errorMessage.startsWith('ERROR.USER_REFRESH')) {
                toastService.showToast({ type: 'error', text: errorMessage, closeAll: true });
            }

            return throwError(() => error);
        }),
    );
};

const getToken = <T>(req: HttpRequest<T>, authService: AuthService) => {
    const jwt = authService.userToken();
    const isUrlWithToken =
        req.url.includes(authService.apiService.baseUrl()) ||
        req.url.includes(authService.apiService.baseGwUrl());
    if (!req.url.includes('/auth/') && isUrlWithToken && jwt) {
        return req.clone({ headers: req.headers.set('Authorization', `Bearer ${jwt}`) });
    }
    return req;
};

const handle401Error = <T>(
    httpClient: HttpClient,
    authService: AuthService,
    request: HttpRequest<T>,
    next: HttpHandlerFn,
) => {
    if (isRefreshing) {
        return refreshSubject$.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap(() => next(getToken(request, authService))),
        );
    }

    isRefreshing = true;
    refreshSubject$.next(null);

    return httpClient
        .post(authService.apiService.baseGwUrl() + authService.refreshTokenUri, {}, { withCredentials: true })
        .pipe(
            switchMap((response) => {
                authService.initUser(response);
                isRefreshing = false;
                isRefreshRejected = false;
                refreshSubject$.next(authService.userToken());
                return next(getToken(request, authService));
            }),
            catchError((error) => {
                isRefreshing = false;
                isRefreshRejected = true;
                refreshSubject$.next(null);
                return throwError(() => error);
            }),
        );
};
