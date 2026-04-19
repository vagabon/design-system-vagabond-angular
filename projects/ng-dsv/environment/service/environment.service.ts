import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { lastValueFrom, tap } from 'rxjs';
import { EnvironmentDto } from '../public-api';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
    private readonly httpClient = inject(HttpClient);

    public env = signal<EnvironmentDto | undefined>(undefined);

    loadEnv(): Promise<EnvironmentDto> {
        return lastValueFrom(
            this.httpClient.get<EnvironmentDto>('./env.json').pipe(tap((res) => this.env.set(res))),
        );
    }
}
