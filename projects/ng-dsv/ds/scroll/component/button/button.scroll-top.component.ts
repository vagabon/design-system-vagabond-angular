import { Component, effect, input, output, signal } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';

@Component({
    selector: 'dsv-scroll-top-button',
    imports: [DsvButtonComponent],
    templateUrl: './button.scroll-top.component.html',
    styleUrls: ['./button.scroll-top.component.scss'],
})
export class ButtonScrollTopComponent {
    scroll = input<number>(0);

    callback = output<void>();

    show = signal<boolean>(false);

    constructor() {
        effect(() => {
            this.show.set(this.scroll() > 400);
        });
    }
}
