import { Directive, inject, signal, TransferState } from '@angular/core';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { I18nService } from '@ng-vagabond-lab/ng-dsv/i18n';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';

@Directive()
export abstract class BaseService {
    readonly toastService = inject(ToastService);
    readonly transferState = inject(TransferState);
    readonly platformService = inject(PlatformService);
    readonly i18nService = inject(I18nService);
    readonly translateService = this.i18nService.translateService;

    readonly loaded = signal<boolean>(true);

    isPlatformBrowser(): boolean {
        return this.platformService.isPlatformBrowser();
    }
}
