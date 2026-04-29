import { inject, Injectable, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { ModalService } from '@ng-vagabond-lab/ng-dsv/ds/modal';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { filter } from 'rxjs';

declare const gtag: Function;

@Injectable({
    providedIn: 'root',
})
export class RouterService {
    readonly router = inject(Router);
    readonly modalService = inject(ModalService);
    readonly plateformService = inject(PlatformService);

    readonly isLoading = signal<boolean>(true);

    readonly currentUrl = signal<string>('');

    interval: ReturnType<typeof setTimeout> | undefined = undefined;

    constructor() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.isLoading.set(true);
            } else if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
            ) {
                this.currentUrl.set(event.url);
                this.isLoading.set(false);
                clearInterval(this.interval);
            }
        });
    }

    initAnalytics(key: string): void {
        if (this.plateformService.isPlatformBrowser()) {
            this.router.events
                .pipe(filter((event) => event instanceof NavigationEnd))
                .subscribe((event: NavigationEnd) => {
                    gtag('config', key, {
                        page_path: event.urlAfterRedirects,
                    });
                });
        }
    }
}
