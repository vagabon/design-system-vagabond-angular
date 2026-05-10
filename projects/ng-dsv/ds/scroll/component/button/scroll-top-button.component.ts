import { Component, effect, input, output, signal } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';

@Component({
    selector: 'dsv-scroll-top-button',
    imports: [DsvButtonComponent],
    templateUrl: './scroll-top-button.component.html',
    styleUrls: ['./scroll-top-button.component.scss'],
})
export class ButtonScrollTopComponent {
    readonly scroll = input<number>(0);

    readonly callback = output<void>();

    readonly show = signal<boolean>(false);

    constructor() {
        effect(() => {
            this.show.set(this.scroll() > 400);
        });
    }
}
