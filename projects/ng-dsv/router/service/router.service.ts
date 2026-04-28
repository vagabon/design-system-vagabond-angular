import { effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { ModalService } from '@ng-vagabond-lab/ng-dsv/ds/modal';
import { filter, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RouterService {
    readonly router = inject(Router);
    readonly modalService = inject(ModalService);

    readonly isLoading = signal<boolean>(true);

    interval: ReturnType<typeof setTimeout> | undefined = undefined;

    currentUrl = toSignal(
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map((event) => event.urlAfterRedirects),
        ),
        { initialValue: this.router.url },
    );

    constructor() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.isLoading.set(true);
            } else if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
            ) {
                this.isLoading.set(false);
                clearInterval(this.interval);
            }
        });

        effect(() => {
            this.currentUrl();
            this.modalService.closeAll();
        });
    }
}
