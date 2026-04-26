import { NgTemplateOutlet } from '@angular/common';
import {
    Component,
    contentChild,
    effect,
    ElementRef,
    inject,
    input,
    output,
    signal,
    TemplateRef,
} from '@angular/core';
import { Scroll } from '@angular/router';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { filter, map } from 'rxjs';
import { ButtonScrollTopComponent, ScrollService } from '../public-api';

@Component({
    selector: 'dsv-scroll-infinite',
    imports: [ButtonScrollTopComponent, NgTemplateOutlet],
    templateUrl: './scroll.infinite.component.html',
    styleUrls: ['./scroll.infinite.component.scss'],
    host: {
        '[id]': 'uuid()',
        class: 'scroll',
        '(scroll)': 'doScroll()',
    },
})
export class ScrollInfiniteContainer {
    readonly scrollService = inject(ScrollService);
    readonly elementRef = inject(ElementRef);
    readonly routerService = inject(RouterService);

    readonly bottomOffset = input<number>(100);
    readonly loading = input<boolean | null>(null);
    readonly skeletonCount = input<number>(10);

    readonly callback = output<void>();

    readonly uuid = signal<string>('');
    readonly top = signal<number>(0);

    private readonly $loading = signal(false);

    skeletonTemplate = contentChild<TemplateRef<void>>('skeleton');

    readonly skeletonArray = signal<number[]>([]);

    constructor() {
        this.routerService.router.events
            .pipe(
                filter((event): event is Scroll => event instanceof Scroll),
                map((event: Scroll) => event.position),
            )
            .subscribe(() => {
                const value = this.scrollService.getScroll(this.uuid(), this.routerService.currentUrl());
                if (value.top === 0 && value.left === 0) {
                    return;
                }
                for (let i = 10; i < 100; i += 10) {
                    setTimeout(() => {
                        this.restoreScroll(value.top, value.left);
                        this.$loading.set(true);
                    }, i);
                }
            });

        effect(() => {
            if (this.scrollService.isPlatformBrowser()) {
                const all = Array.from(document.querySelectorAll('.scroll'));
                const index = all.indexOf(this.elementRef.nativeElement);
                this.uuid.set(this.scrollService.getRouteUuid(index));
            }
        });

        effect(() => {
            if (!this.loading()) {
                this.$loading.set(false);
            }
        });

        effect(() => {
            this.skeletonArray.set(Array.from({ length: this.skeletonCount() }, (_, i) => i));
        });
    }

    restoreScroll(top: number, left: number) {
        if (top === 0 && left === 0) {
            return;
        }
        this.top.set(top);
        this.elementRef.nativeElement.scrollTop = top;
        this.elementRef.nativeElement.scrollLeft = left;
        this.resetLoading();
    }

    private resetLoading() {
        setTimeout(() => {
            this.$loading.set(false);
        }, 500);
    }

    scrollToTop() {
        this.elementRef.nativeElement.scrollTop = 0;
        this.scrollService.saveScroll(this.uuid(), this.routerService.currentUrl(), 0, 0);
    }

    doScroll() {
        const value = this.scrollService.getScroll(this.uuid(), this.routerService.currentUrl());

        const scrollTop = this.elementRef.nativeElement.scrollTop;
        const scrollLeft = this.elementRef.nativeElement.scrollLeft;

        if (scrollTop < value.top - 500 && scrollLeft < value.left - 500) {
            return;
        }

        const element = this.elementRef.nativeElement;
        const distanceToBottom = element.scrollHeight - element.scrollTop - element.clientHeight;

        this.scrollService.saveScroll(
            this.uuid(),
            this.routerService.currentUrl(),
            element.scrollTop,
            element.scrollLeft,
        );
        this.top.set(element.scrollTop);

        if (distanceToBottom < this.bottomOffset() && !this.$loading()) {
            this.$loading.set(true);
            this.callback.emit();
            this.resetLoading();
        }
    }
}
