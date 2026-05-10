import { computed, Directive, effect, inject, signal } from '@angular/core';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/module/auth';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { SeoService } from '../service/seo/seo.service';

@Directive()
export abstract class BaseContainer {
    readonly authService = inject(AuthService);
    readonly seoService = inject(SeoService);
    readonly routerService = inject(RouterService);

    protected requiredRole = signal<string>('');

    readonly hasAccess = computed<boolean>(() => {
        const role = this.requiredRole();
        return !role || this.authService.hasRole(role);
    });

    constructor() {
        effect(() => {
            if (!this.hasAccess()) {
                this.routerService.router.navigate(['/']);
            }
        });
    }
}
