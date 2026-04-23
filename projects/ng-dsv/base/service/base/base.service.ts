import { Directive, inject, signal, TransferState } from '@angular/core';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';

@Directive()
export abstract class BaseService {
    readonly apiService = inject(ApiService);
    readonly transferState = inject(TransferState);

    readonly loaded = signal<boolean>(true);

    isPlatformBrowser() {
        return this.apiService.platformService.isPlatformBrowser();
    }
}
