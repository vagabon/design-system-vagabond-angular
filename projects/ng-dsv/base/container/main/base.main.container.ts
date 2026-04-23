import { effect, inject, signal } from '@angular/core';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/modules/auth';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';

export abstract class BaseMainContainer {
    readonly authService = inject(AuthService);
    readonly routerService = inject(RouterService);

    initRefreshToken = signal<boolean>(false);

    constructor() {
        effect(() => {
            if (this.authService.isPlatformBrowser() && !this.initRefreshToken()) {
                this.initRefreshToken.set(true);
                this.authService.refreshToken();
            }
        });
    }
}
