import { Directive, effect, inject, signal } from '@angular/core';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/module/auth';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';

@Directive()
export abstract class BaseMainContainer {
    readonly authService = inject(AuthService);
    readonly routerService = inject(RouterService);

    readonly initRefreshToken = signal<boolean>(false);

    constructor() {
        effect(() => {
            if (this.authService.isPlatformBrowser() && !this.initRefreshToken()) {
                this.initRefreshToken.set(true);
                this.authService.refreshToken();
            }
        });
    }
}
