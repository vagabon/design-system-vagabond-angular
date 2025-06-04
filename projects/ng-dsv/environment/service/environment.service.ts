import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { EnvironmentDto } from '../public-api';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  private readonly httpClient = inject(HttpClient);

  public isScrollDown = signal<boolean>(false);
  public env = signal<EnvironmentDto | undefined>(undefined);

  loadEnv() {
    this.httpClient.get<EnvironmentDto>('./env.json').subscribe({
      next: (res) => {
        this.env.set(res);
      },
    });
  }
}
