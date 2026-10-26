import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken, makeStateKey, signal, TransferState } from '@angular/core';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { lastValueFrom, tap } from 'rxjs';
import { EnvironmentDto } from '../public-api';

export const SSR_CONFIG = new InjectionToken<EnvironmentDto>('SSR_CONFIG');

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
    readonly httpClient = inject(HttpClient);
    readonly transferState = inject(TransferState);
    readonly platformService = inject(PlatformService);
    private readonly ssrConfig = inject(SSR_CONFIG, { optional: true });

    readonly config = signal<EnvironmentDto | undefined>(undefined);
    readonly baseUrl = signal<string>('');

    loadEnv(): Promise<EnvironmentDto> {
        const key = makeStateKey<EnvironmentDto>('config.json');
        if (this.transferState.hasKey(key)) {
            const config = this.transferState.get<EnvironmentDto>(key, {} as EnvironmentDto);
            this.transferState.remove(key);
            this.initConfig(config);
            return Promise.resolve(config);
        }

        if (
            this.platformService.isPlatformServer() &&
            this.ssrConfig &&
            Object.keys(this.ssrConfig).length > 0
        ) {
            this.transferState.set(key, this.ssrConfig);
            this.initConfig(this.ssrConfig);
            return Promise.resolve(this.ssrConfig);
        }

        return lastValueFrom(
            this.httpClient.get<EnvironmentDto>('./config.json').pipe(
                tap((config) => {
                    this.transferState.set(key, config);
                    this.initConfig(config);
                }),
            ),
        );
    }

    initConfig(config: EnvironmentDto) {
        this.config.set(config);
        if (config.PROD) {
            console.log = () => {};
        }
    }
}
