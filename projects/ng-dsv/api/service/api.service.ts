import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { Observable } from 'rxjs';
import { ApiDto, ID, JSONObject, OrderState } from '../dto/api.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly httpClient = inject(HttpClient);
  readonly toastService = inject(ToastService);
  readonly platformService = inject(PlatformService);

  load = signal<boolean>(false);
  baseUrl: string = '';

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  get<T>(url: string, callback: (data: T) => void) {
    this.doSubscribe(url, this.httpClient.get<T>(this.baseUrl + url), callback);
  }

  post<T>(url: string, data: T, callback: (data: T) => void) {
    this.doSubscribe(url, this.httpClient.post<T>(this.baseUrl + url, data), callback);
  }

  put<T>(url: string, data: T, callback: (data: T) => void) {
    this.doSubscribe(url, this.httpClient.put<T>(this.baseUrl + url, data), callback);
  }

  delete<T>(url: string, callback: (data: T) => void) {
    this.doSubscribe(url, this.httpClient.delete<T>(this.baseUrl + url), callback);
  }


  findById<T>(endPoint: string, id: ID, callback: (data: T) => void) {
    this.get<T>(endPoint + '/' + id, callback);
  }

  findBy<T>(
    endPoint: string,
    fields: string,
    values: string,
    first: number,
    max: number,
    order: OrderState,
    callback: (data: T) => void
  ) {
    const orderType: string = order.orderAsc ? '' : 'Desc';
    const orderConst: string = order.order ? '>>' + order.order + orderType : '';
    const fieldsComplete = fields + orderConst;
    this.get<T>(
      endPoint + '?fields=' + encodeURI(fieldsComplete) + '&values=' + encodeURI(values) + '&first=' + first + '&max=' + max,
      (data: T) => {
        callback(data);
      },
    );
  }

  countBy(endPoint: string, fields: string, values: string, callback: (data: { count: number }) => void) {
    return this.get<{ count: number }>(endPoint + '?fields=' + encodeURI(fields) + '&values=' + values,
      (data: { count: number }) => {
        callback(data);
      }
    );
  }

  createOrUpdate<T extends ApiDto>(endPoint: string, data: T, callback: (data: T) => void) {
    if (data.id !== null && data.id !== undefined && data.id !== '' && Number(data.id) > 0) {
      this.put<T>('/' + endPoint + '/', data, (dateReturn: T) => {
        this.toastService.showToast({ text: 'UPDATE_OK', type: 'success' });
        callback(dateReturn);
      });
    } else {
      this.post<T>('/' + endPoint + '/', data, (dateReturn: T) => {
        this.toastService.showToast({ text: 'CREATION_OK', type: 'success' });
        callback(dateReturn);
      });
    }
  }

  doSubscribe<T>(url: string, observable: Observable<T>, callback: (data: T) => void) {
    this.load.set(true);
    observable.subscribe({
      next: (res) => {
        this.load.set(false);
        this.info(url, res as JSONObject);
        callback(res);
      },
      error: (error: JSONObject) => {
        this.load.set(false);
        this.error(url, error);
      },
    });
  }

  info(url: string, data: JSONObject) {
    if (this.platformService.isPlatformBrowser()) {
      console.log(url, data);
    }
  }

  error(url: string, error: JSONObject) {
    if (this.platformService.isPlatformBrowser()) {
      console.error(url, error);
    }
  }
}
