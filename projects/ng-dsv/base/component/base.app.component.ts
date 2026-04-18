import { effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';
import { filter, map } from 'rxjs';
import { ScrollService } from '../public-api';

export abstract class BaseAppComponent {
    readonly platformService = inject(PlatformService);
    readonly storageService: StorageService = inject(StorageService);
    readonly environmentService = inject(EnvironmentService);
    readonly apiService = inject(ApiService);
    readonly scrollService = inject(ScrollService);
    readonly router = inject(Router);

    currentUrl = toSignal(
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map((event) => event.urlAfterRedirects),
        ),
        { initialValue: this.router.url },
    );
    scroll = signal<number>(0);

    load = signal<boolean>(false);

    constructor() {
        inject(Router)
            .events.pipe(
                filter((event): event is Scroll => event instanceof Scroll),
                map((event: Scroll) => event.position),
            )
            .subscribe(() => {
                if (this.platformService.isPlatformBrowser() && this.scrollService.getScroll()) {
                    const divScrolls = document.getElementsByClassName('scroll');
                    Array.from(divScrolls).forEach((scroll) => {
                        setTimeout(() => {
                            scroll?.scrollTo(0, this.scrollService.getScroll() ?? 0);
                        }, 100);
                    });
                }
            });

        effect(() => {
            if (this.environmentService.env()) {
                const apiUrl = this.environmentService.env()?.API_URL!;
                this.apiService.setBaseUrl(apiUrl);
                this.load.set(true);
            }
        });
    }

    doScroll() {
        const divScroll = document.getElementsByClassName('scroll')?.[0];
        if (document.getElementsByClassName('scroll').length === 1) {
            this.scrollService.saveScroll(divScroll.scrollTop);
            this.scrollService.scroll.set(divScroll.scrollTop);
        }
    }
}
