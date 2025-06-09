import {
  HttpClient,
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';
import { catchError, switchMap, throwError } from 'rxjs';
import { ApiService } from '../public-api';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const httpClient = inject(HttpClient);
  const apiService = inject(ApiService);
  const storageService = inject(StorageService);
  const toastService = inject(ToastService);

  return next(getToken(req, apiService, storageService)).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        !req.url.includes('auth/') &&
        req.url.includes(apiService.baseUrl) &&
        error.status === 401
      ) {
        return handle401Error(
          httpClient,
          apiService,
          storageService,
          req,
          next
        );
      }

      console.error(error);

      toastService.showToast({
        type: 'error',
        text: error.error.debugMessage ?? error.error.message ?? error.message,
      })

      return throwError(() => error);
    })
  );
};

const getToken = <T>(
  req: HttpRequest<T>,
  apiService: ApiService,
  storageService: StorageService
) => {
  const jwt =
    storageService.getItem('user-connected')?.['jwt' as keyof {}] ?? '';
  if (!req.url.includes('/auth/') && req.url.includes(apiService.baseUrl)) {
    const headers = req.headers.set('Authorization', `Bearer ${jwt}`);

    return req.clone({
      headers,
    });
  }
  return req;
};

const handle401Error = <T>(
  httpClient: HttpClient,
  apiService: ApiService,
  storageService: StorageService,
  request: HttpRequest<T>,
  next: HttpHandlerFn
) => {
  const jwtRefresh =
    storageService.getItem('user-connected')?.['jwtRefresh' as keyof {}] ?? '';
  return httpClient
    .post(apiService.baseUrl + '/auth/refresh-token', {
      refreshToken: jwtRefresh,
    })
    .pipe(
      switchMap((response) => {
        storageService.setItem('user-connected', JSON.stringify(response));
        return next(getToken(request, apiService, storageService));
      })
    );
};
