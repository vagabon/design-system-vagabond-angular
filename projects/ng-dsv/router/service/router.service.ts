import { effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { ModalService } from '@ng-vagabond-lab/ng-dsv/ds/modal';
import { filter, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RouterService {
    readonly router = inject(Router);
    readonly modalService = inject(ModalService);

    currentUrl = toSignal(
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map((event) => event.urlAfterRedirects),
        ),
        { initialValue: this.router.url },
    );

    constructor() {
        effect(() => {
            this.currentUrl();
            this.modalService.closeAll();
        });
    }
}
