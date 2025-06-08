import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JSONObject } from '../dto/api.dto';
import { ApiLoadService } from './api.load.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = '';
  httpClient = inject(HttpClient);
  apiLoadService = inject(ApiLoadService);

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  get<T>(url: string, callback: (data: T) => void) {
    this.apiLoadService.load.set(true);
    this.httpClient.get<T>(this.baseUrl + url).subscribe({
      next: (res) => {
        this.apiLoadService.load.set(false);
        this.info(url, res as JSONObject);
        callback(res);
      },
      error: (error: JSONObject) => {
        this.apiLoadService.load.set(false);
        this.error(url, error);
      },
    });
  }

  post<T>(url: string, data: T, callback: (data: T) => void) {
    this.apiLoadService.load.set(true);
    this.doSubscribe(url, this.httpClient.post<T>(this.baseUrl + url, data), callback);
  }

  put<T>(url: string, data: T, callback: (data: T) => void) {
    this.apiLoadService.load.set(true);
    this.doSubscribe(url, this.httpClient.put<T>(this.baseUrl + url, data), callback);
  }

  doSubscribe<T>(url: string, observable: Observable<T>, callback: (data: T) => void) {
    observable.subscribe({
      next: (res) => {
        this.apiLoadService.load.set(false);
        this.info(url, res as JSONObject);
        callback(res);
      },
      error: (error: JSONObject) => {
        this.apiLoadService.load.set(false);
        this.error(url, error);
      },
    });
  }

  info(url: string, data: JSONObject) {
    console.log(url, data);
  }

  error(url: string, error: JSONObject) {
    console.error(url, error);
  }
}
