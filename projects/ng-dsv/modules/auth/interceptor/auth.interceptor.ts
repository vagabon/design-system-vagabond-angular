import { HttpClient, HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../public-api';

let isRefreshing = false;
const refreshSubject$ = new BehaviorSubject<string | null>(null);

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const httpClient = inject(HttpClient);
    const authService = inject(AuthService);
    const toastService = inject(ToastService);

    return next(getToken(req, authService)).pipe(
        catchError((error) => {
            if (
                error instanceof HttpErrorResponse &&
                !req.url.includes('auth/') &&
                req.url.includes(authService.apiService.baseUrl()) &&
                error.status === 401
            ) {
                return handle401Error(httpClient, authService, req, next);
            }

            let errorMessage = error.error?.debugMessage ?? error.error?.message ?? error.message;

            if (errorMessage === 'fetch failed' || errorMessage === 'Failed to fetch') {
                errorMessage = 'Api indisponible';
            }
            if (errorMessage === 'NO_REFRESH_TOKEN') {
                authService.logout(false);
            } else {
                toastService.showToast({ type: 'error', text: errorMessage });
            }

            return throwError(() => error);
        }),
    );
};

const getToken = <T>(req: HttpRequest<T>, authService: AuthService) => {
    const jwt = authService.userToken();
    if (!req.url.includes('/auth/') && req.url.includes(authService.apiService.baseUrl()) && jwt) {
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
        .post(authService.apiService.baseUrl() + '/auth/refresh-token', {}, { withCredentials: true })
        .pipe(
            switchMap((response) => {
                authService.initUser(response);
                isRefreshing = false;
                refreshSubject$.next(authService.userToken());
                return next(getToken(request, authService));
            }),
            catchError((error) => {
                isRefreshing = false;
                refreshSubject$.next(null);
                authService.logout(false);
                return throwError(() => error);
            }),
        );
};
