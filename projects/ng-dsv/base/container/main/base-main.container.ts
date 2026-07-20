import { Directive, effect, inject, signal } from '@angular/core';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/module/auth';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { AnalyticsService } from '../../service/analytics/analytics.service';

@Directive()
export abstract class BaseMainContainer {
    readonly authService = inject(AuthService);
    readonly routerService = inject(RouterService);
    readonly environmentService = inject(EnvironmentService);
    readonly analyticsService = inject(AnalyticsService);

    readonly initRefreshToken = signal<boolean>(false);

    constructor() {
        this.analyticsService.init(this.environmentService.config()?.ANALYTICS_ID);
        effect(() => {
            if (this.authService.isPlatformBrowser() && !this.initRefreshToken()) {
                this.initRefreshToken.set(true);
                this.authService.refreshToken();
            }
        });
    }
}
