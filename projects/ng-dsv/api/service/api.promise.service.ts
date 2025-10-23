import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { lastValueFrom, Observable } from 'rxjs';
import { ApiDto, ID, JSONObject, OrderState } from '../dto/api.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiPromiseService {
  readonly httpClient = inject(HttpClient);
  readonly toastService = inject(ToastService);
  readonly platformService = inject(PlatformService);

  load = signal<boolean>(false);
  baseUrl: string = '';

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  get<T>(url: string) {
    return this.doSubscribe(url, this.httpClient.get<T>(this.baseUrl + url));
  }

  post<T>(url: string, data: T) {
    return this.doSubscribe(url, this.httpClient.post<T>(this.baseUrl + url, data));
  }

  put<T>(url: string, data: T) {
    return this.doSubscribe(url, this.httpClient.put<T>(this.baseUrl + url, data));
  }

  delete<T>(url: string) {
    return this.doSubscribe(url, this.httpClient.delete<T>(this.baseUrl + url));
  }


  findById<T>(endPoint: string, id: ID) {
    this.get<T>(endPoint + '/' + id);
  }

  findBy<T>(
    endPoint: string,
    fields: string,
    values: string,
    first: number,
    max: number,
    order: OrderState
  ) {
    const orderType: string = order.orderAsc ? '' : 'Desc';
    const orderConst: string = order.order ? '>>' + order.order + orderType : '';
    const fieldsComplete = fields + orderConst;
    return this.get<T>(
      endPoint + '?fields=' + encodeURI(fieldsComplete) + '&values=' + encodeURI(values) + '&first=' + first + '&max=' + max,
    );
  }

  countBy(endPoint: string, fields: string, values: string) {
    return this.get<{ count: number }>(endPoint + '?fields=' + encodeURI(fields) + '&values=' + values);
  }

  createOrUpdate<T extends ApiDto>(endPoint: string, data: T) {
    if (data.id !== null && data.id !== undefined && data.id !== '' && Number(data.id) > 0) {
      return this.put<T>(endPoint + '/', data).then((dateReturn: T) => {
        this.toastService.showToast({ text: 'UPDATE_OK', type: 'success' });
        return Promise.resolve(dateReturn);
      });
    } else {
      return this.post<T>(endPoint + '/', data).then((dateReturn: T) => {
        this.toastService.showToast({ text: 'CREATION_OK', type: 'success' });
        return Promise.resolve(dateReturn);
      });
    }
  }

  private doSubscribe<T>(url: string, observable: Observable<T>): Promise<T> {
    this.load.set(true);
    return lastValueFrom(observable).then((res) => {
      this.load.set(false);
      this.info(url, res as JSONObject);
      return Promise.resolve(res);
    }).catch((error) => {
      this.load.set(false);
      this.error(url, error);
      return Promise.reject(new Error(error));
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
