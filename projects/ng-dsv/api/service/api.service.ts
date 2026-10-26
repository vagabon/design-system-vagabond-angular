import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
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
    readonly environmentService = inject(EnvironmentService);

    readonly baseUrl = signal<string>('/api');
    readonly baseGwUrl = signal<string>('/api');
    readonly nbLoaded = signal<number>(0);
    readonly blocked = signal<boolean>(false);

    get<T>(
        url: string,
        callback: (data: T) => void,
        callbackError: () => void = () => {},
        baseUrl: string = this.baseUrl(),
    ) {
        this.doSubscribe(url, '', this.httpClient.get<T>(baseUrl + url), callback, callbackError);
    }

    post<TBody, TResponse = TBody>(
        url: string,
        data: TBody,
        callback: (data: TResponse) => void = () => {},
        withCredentials: boolean = false,
        callbackError: () => void = () => {},
        baseUrl: string = this.baseUrl(),
    ) {
        this.doSubscribe(
            url,
            data as JSONObject,
            this.httpClient.post<TResponse>(baseUrl + url, data, { withCredentials }),
            callback,
            callbackError,
        );
    }

    put<TBody, TResponse = TBody>(
        url: string,
        data: TBody,
        callback: (data: TResponse) => void = () => {},
        callbackError: () => void = () => {},
        baseUrl: string = this.baseUrl(),
    ) {
        this.doSubscribe(
            url,
            data as JSONObject,
            this.httpClient.put<TResponse>(baseUrl + url, data),
            callback,
            callbackError,
        );
    }

    delete<T>(url: string, callback: (data: T) => void, callbackError: () => void = () => {}) {
        this.doSubscribe(url, '', this.httpClient.delete<T>(this.baseUrl() + url), callback, callbackError);
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
        callback: (data: T) => void,
    ) {
        const orderType: string = order.orderAsc ? '' : 'Desc';
        const orderConst: string = order.order ? '>>' + order.order + orderType : '';
        const fieldsComplete = fields + orderConst;
        this.get<T>(
            endPoint +
                '?fields=' +
                encodeURI(fieldsComplete) +
                '&values=' +
                encodeURI(values) +
                '&first=' +
                first +
                '&max=' +
                max,
            (data: T) => {
                callback(data);
            },
        );
    }

    countBy(endPoint: string, fields: string, values: string, callback: (data: { count: number }) => void) {
        return this.get<{ count: number }>(
            endPoint + '?fields=' + encodeURI(fields) + '&values=' + values,
            (data: { count: number }) => {
                callback(data);
            },
        );
    }

    createOrUpdate<T extends ApiDto>(endPoint: string, data: T, callback: (data: T) => void, toast?: string) {
        if (this.blocked()) {
            return;
        }
        this.blocked.set(true);
        if (data.id !== null && data.id !== undefined && data.id !== '' && Number(data.id) > 0) {
            this.put<T>(
                '/' + endPoint + '/',
                data,
                (dateReturn: T) => {
                    toast &&
                        this.toastService.showToast({
                            text: toast ?? 'UPDATE_OK',
                            type: 'success',
                            closeAll: true,
                        });
                    callback(dateReturn);
                    this.blocked.set(false);
                },
                () => {
                    this.blocked.set(false);
                },
            );
        } else {
            this.post<T>(
                '/' + endPoint + '/',
                data,
                (dateReturn: T) => {
                    toast && this.toastService.showToast({ text: toast ?? 'CREATION_OK', type: 'success' });
                    callback(dateReturn);
                    this.blocked.set(false);
                },
                false,
                () => {
                    this.blocked.set(false);
                },
            );
        }
    }

    doSubscribe<T>(
        url: string,
        data: JSONObject | '',
        observable: Observable<T>,
        callback: (data: T) => void,
        callbackError: () => void = () => {},
    ) {
        this.nbLoaded.update((loaded) => loaded + 1);
        observable.subscribe({
            next: (res) => {
                this.nbLoaded.update((loaded) => loaded - 1);
                this.info(url, data, res as JSONObject);
                callback(res);
            },
            error: (error: JSONObject) => {
                this.nbLoaded.update((loaded) => loaded - 1);
                this.error(url, data, error);
                callbackError();
            },
        });
    }

    info(url: string, body: JSONObject | '', data: JSONObject | null = null) {
        if (this.platformService.isPlatformBrowser()) {
            console.log(url, body, data);
        }
    }

    error(url: string, body: JSONObject | '', error: JSONObject) {
        if (this.platformService.isPlatformBrowser()) {
            console.error(url, body, error);
        }
    }
}
