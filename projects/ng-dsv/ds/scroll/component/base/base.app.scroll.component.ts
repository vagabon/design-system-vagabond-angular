import { inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { filter, map } from 'rxjs';
import { ScrollService, scrollOnClassTo } from '../../public-api';

export abstract class BaseAppScrollComponent {
    readonly platformService = inject(PlatformService);
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

    constructor() {
        inject(Router)
            .events.pipe(
                filter((event): event is Scroll => event instanceof Scroll),
                map((event: Scroll) => event.position),
            )
            .subscribe(() => {
                if (this.platformService.isPlatformBrowser() && this.scrollService.getScroll()) {
                    setTimeout(() => {
                        scrollOnClassTo('scroll', 0, this.scrollService.getScroll() ?? 0);
                    }, 100);
                }
            });
    }

    doScroll() {
        const divScroll = document.getElementsByClassName('scroll')?.[0];
        this.scrollService.saveScroll(divScroll.scrollTop);
        this.scrollService.scroll.set(divScroll.scrollTop);
    }
}
