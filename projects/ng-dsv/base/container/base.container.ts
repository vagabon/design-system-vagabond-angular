import { computed, effect, inject, signal } from '@angular/core';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/modules/auth';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { SeoService } from '../service/seo/seo.service';

export abstract class BaseContainer {
    readonly authService = inject(AuthService);
    readonly seoService = inject(SeoService);
    readonly routerService = inject(RouterService);

    protected requiredRole = signal('');

    constructor() {
        effect(() => {
            if (!this.hasAccess()) {
                this.routerService.router.navigate(['/']);
            }
        });
    }

    readonly hasAccess = computed(() => {
        const role = this.requiredRole();
        return !role || this.authService.hasRole(role);
    });
}
