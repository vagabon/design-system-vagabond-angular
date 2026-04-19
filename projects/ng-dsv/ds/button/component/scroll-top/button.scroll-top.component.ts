import { Component, effect, inject, input, signal } from '@angular/core';
import { scrollOnClassTo } from '@ng-vagabond-lab/ng-dsv/ds/scroll';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { DsvButtonComponent } from '../button.component';

@Component({
    selector: 'dsv-scroll-top-button',
    imports: [DsvButtonComponent],
    templateUrl: './button.scroll-top.component.html',
    styleUrls: ['./button.scroll-top.component.scss'],
})
export class ButtonScrollTopComponent {
    readonly platformService = inject(PlatformService);

    scroll = input<number>(0);

    show = signal<boolean>(false);

    constructor() {
        effect(() => {
            this.show.set(this.scroll() > 400);
        });
    }

    scrollToTop() {
        if (this.platformService.isPlatformBrowser()) {
            scrollOnClassTo('scroll', 0, 0);
        }
    }
}
