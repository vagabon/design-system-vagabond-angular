import { Directive, inject, signal, TransferState } from '@angular/core';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';

@Directive()
export abstract class BaseService {
    readonly apiService = inject(ApiService);
    readonly toastService = inject(ToastService);
    readonly transferState = inject(TransferState);

    readonly loaded = signal<boolean>(true);

    isPlatformBrowser() {
        return this.apiService.platformService.isPlatformBrowser();
    }
}
