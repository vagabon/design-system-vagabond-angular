import {
  HttpClient,
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { ApiService } from '../service/api.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const httpClient = inject(HttpClient);
  return next(getToken(req)).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        !req.url.includes('auth/') &&
        error.status === 401
      ) {
        return handle401Error(httpClient, req, next);
      }

      return throwError(() => error);
    })
  );
};

const getToken = <T>(req: HttpRequest<T>) => {
  const jwt = JSON.parse(localStorage.getItem('user-connected')!)?.jwt;
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
  request: HttpRequest<T>,
  next: HttpHandlerFn
) => {
  console.log('401 error');

  const jwtRefresh = JSON.parse(
    localStorage.getItem('user-connected')!
  )?.jwtRefresh;

  const apiService = inject(ApiService);

  return httpClient
    .post(apiService.baseUrl + '/auth/refresh-token', {
      refreshToken: jwtRefresh,
    })
    .pipe(
      switchMap((response) => {
        localStorage.setItem('user-connected', JSON.stringify(response));
        return next(getToken(request));
      })
    );
};
