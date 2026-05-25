import { HttpClient } from '@angular/common/http';
import { inject, Injectable, makeStateKey, signal, TransferState } from '@angular/core';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { lastValueFrom, tap } from 'rxjs';
import { EnvironmentDto } from '../public-api';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
    readonly httpClient = inject(HttpClient);
    readonly transferState = inject(TransferState);
    readonly platformService = inject(PlatformService);

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
