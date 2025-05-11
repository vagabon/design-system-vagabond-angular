import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { EnvironmentDto } from '../public-api';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  public isScrollDown = signal(false);
  public env: WritableSignal<EnvironmentDto | undefined> = signal(undefined);

  constructor(private readonly httpClient: HttpClient) {
    this.loadEnv();
  }

  loadEnv() {
    this.httpClient.get<EnvironmentDto>('./env.json').subscribe({
      next: (res) => {
        this.env.set(res);
      },
    });
  }
}
