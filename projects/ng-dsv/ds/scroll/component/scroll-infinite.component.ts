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
import { NavigationStart, Scroll } from '@angular/router';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { filter, map } from 'rxjs';
import { ButtonScrollTopComponent, getVisibleCount, ScrollService } from '../public-api';

@Component({
    selector: 'dsv-scroll-infinite',
    imports: [ButtonScrollTopComponent, NgTemplateOutlet],
    templateUrl: './scroll-infinite.component.html',
    styleUrls: ['./scroll-infinite.component.scss'],
    host: {
        '[id]': 'id() ?? uuid()',
        class: 'scroll',
        '(scroll)': 'doScroll()',
        '(touchstart)': 'stopPropagation() ? onTouchStart($event) : null',
        '(touchend)': 'stopPropagation() ? onTouchEnd($event) : null',
    },
})
export class DsvScrollInfiniteContainer {
    readonly scrollService = inject(ScrollService);
    readonly elementRef = inject(ElementRef);
    readonly routerService = inject(RouterService);

    readonly bottomOffset = input<number>(100);
    readonly loading = input<boolean | null>(null);
    readonly id = input<string | undefined>();
    readonly stopPropagation = input<boolean>(false);

    readonly callback = output<void>();
    readonly uuid = signal<string>('');
    readonly top = signal<number>(0);
    readonly skeletonCount = signal<number>(0);

    private readonly $loading = signal(false);

    readonly skeletonTemplate = contentChild<TemplateRef<void>>('skeleton');
    readonly skeletonArray = signal<number[]>([]);

    constructor() {
        this.routerService.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.$loading.set(true);
            }
        });
        this.routerService.router.events
            .pipe(
                filter((event): event is Scroll => event instanceof Scroll),
                map((event: Scroll) => event.position),
            )
            .subscribe(() => {
                const url = this.routerService.currentUrl();
                const value = this.scrollService.getScroll(this.uuid(), url);
                this.restoreScroll(value?.top, value?.left);
                setTimeout(() => {
                    this.restoreScroll(value?.top, value?.left);
                    this.$loading.set(false);
                }, 100);
            });

        effect(() => {
            if (this.scrollService.isPlatformBrowser()) {
                if (this.id()) {
                    this.uuid.set(this.id()!);
                } else {
                    const all = Array.from(document.querySelectorAll('.scroll'));
                    const index = all.indexOf(this.elementRef.nativeElement);
                    this.uuid.set(this.scrollService.getRouteUuid(index));
                }
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

        effect(() => {
            const small = this.elementRef.nativeElement.classList.contains('small');
            const count = getVisibleCount(this.scrollService.platformService.width(), small);
            this.skeletonCount.set(count);
        });
    }

    restoreScroll(top: number, left: number): void {
        this.top.set(top);
        this.elementRef.nativeElement.scrollTop = top;
        this.elementRef.nativeElement.scrollLeft = left;
    }

    private resetLoading(): void {
        setTimeout(() => {
            this.$loading.set(false);
        }, 10);
    }

    scrollToTop(): void {
        this.elementRef.nativeElement.scrollTop = 0;
        this.scrollService.saveScroll(this.uuid(), this.routerService.currentUrl(), 0, 0);
    }

    doScroll(): void {
        if (this.$loading()) {
            return;
        }

        const element = this.elementRef.nativeElement;

        this.scrollService.saveScroll(
            this.uuid(),
            this.routerService.currentUrl(),
            element.scrollTop,
            element.scrollLeft,
        );
        this.top.set(element.scrollTop);

        const distanceToBottom = element.scrollHeight - element.scrollTop - element.clientHeight;

        if (distanceToBottom < this.bottomOffset() && !this.$loading()) {
            this.$loading.set(true);
            this.callback.emit();
            this.resetLoading();
        }
    }

    touchStartX: number = 0;

    onTouchStart(event: TouchEvent): void {
        if (event.touches.length > 0) {
            this.touchStartX = event.touches[0].clientX;
        }

        const element = this.elementRef.nativeElement as HTMLElement;

        if (element.scrollLeft > 0) {
            event.stopPropagation();
        }
    }

    onTouchEnd(event: TouchEvent): void {
        const element = this.elementRef.nativeElement as HTMLElement;

        if (element.scrollLeft > 0) {
            event.stopPropagation();
            return;
        }

        if (event.changedTouches.length > 0) {
            const touchEndX = event.changedTouches[0].clientX;
            const deltaX = touchEndX - this.touchStartX;
            if (deltaX < 0) {
                event.stopPropagation();
            }
        }
    }
}
