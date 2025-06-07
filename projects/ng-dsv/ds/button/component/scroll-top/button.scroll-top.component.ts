import { Component, effect, input, signal } from '@angular/core';
import { DsvButtonComponent } from '../button.component';

@Component({
    selector: 'app-scroll-top-button',
    imports: [
        DsvButtonComponent
    ],
    standalone: true,
    templateUrl: './button.scroll-top.component.html',
    styleUrls: ['./button.scroll-top.component.scss'],
})
export class ButtonScrollTopComponent {
    scroll = input<number>(0);

    show = signal<boolean>(false);

    constructor() {
        effect(() => {
            this.show.set(this.scroll() > 400);
        })
    }

    scrollToTop() {
        document.getElementById('scroll')?.scrollTo(0, 0);
    }
}
