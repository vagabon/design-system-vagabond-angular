import {
  HttpClient,
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';
import { catchError, switchMap, throwError } from 'rxjs';
import { ApiService } from '../public-api';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const httpClient = inject(HttpClient);
  const apiService = inject(ApiService);
  const storageService = inject(StorageService);

  return next(getToken(req, storageService)).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        !req.url.includes('auth/') &&
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

      return throwError(() => error);
    })
  );
};

const getToken = <T>(req: HttpRequest<T>, storageService: StorageService) => {
  const jwt =
    storageService.getItem('user-connected')?.['jwt' as keyof {}] ?? '';
  if (!req.url.includes('/auth/')) {
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
  console.log('401 error');

  const jwtRefresh =
    storageService.getItem('user-connected')?.['jwtRefresh' as keyof {}] ?? '';
  console.log(jwtRefresh);

  return httpClient
    .post(apiService.baseUrl + '/auth/refresh-token', {
      refreshToken: jwtRefresh,
    })
    .pipe(
      switchMap((response) => {
        storageService.setItem('user-connected', JSON.stringify(response));
        return next(getToken(request, storageService));
      })
    );
};
