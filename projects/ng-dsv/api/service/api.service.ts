import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JSONObject } from '../dto/api.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = '';
  httpClient = inject(HttpClient);

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  get<T>(url: string, callback: (data: T) => void) {
    this.httpClient.get<T>(this.baseUrl + url).subscribe({
      next: (res) => {
        this.info(url, res as JSONObject);
        callback(res);
      },
      error: (error: JSONObject) => {
        this.error(url, error);
      },
    });
  }

  post<T>(url: string, data: T, callback: (data: T) => void) {
    this.httpClient.post<T>(this.baseUrl + url, data).subscribe({
      next: (res) => {
        this.info(url, res as JSONObject);
        callback(res);
      },
      error: (error: JSONObject) => {
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
