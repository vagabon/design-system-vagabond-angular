import { Component, ElementRef, inject, input, output } from '@angular/core';
import { ScrollService } from '../public-api';

@Component({
    selector: 'dsv-scroll-infinite',
    imports: [],
    templateUrl: './scroll.infinite.component.html',
    styleUrls: ['./scroll.infinite.component.scss'],
    host: {
        class: 'scroll',
        '(scroll)': 'doScroll()',
    },
})
export class ScrollInfiniteContainer {
    scrollService = inject(ScrollService);
    elementRef = inject(ElementRef);

    class = input<string>('');
    interval = input<number>(20);

    callback = output<void>();

    loading = input<boolean>(false);

    doScroll() {
        const divScroll = document.getElementsByClassName(this.class())?.[0];
        const scrollClientHeight = divScroll?.scrollTop + divScroll?.clientHeight;
        const distanceToBottom = divScroll?.scrollHeight - scrollClientHeight;
        this.scrollService.saveScroll(divScroll?.scrollTop);
        this.scrollService.scroll.set(divScroll?.scrollTop);
        if (distanceToBottom < this.interval()) {
            this.callback.emit();
        }
    }
}
