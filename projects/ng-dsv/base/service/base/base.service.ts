import { Directive, inject, signal, TransferState } from '@angular/core';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';

@Directive()
export abstract class BaseService {
    readonly toastService = inject(ToastService);
    readonly transferState = inject(TransferState);
    readonly platformService = inject(PlatformService);

    readonly loaded = signal<boolean>(true);

    isPlatformBrowser() {
        return this.platformService.isPlatformBrowser();
    }
}
