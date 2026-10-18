import { Directive, ElementRef, inject, output, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appSwipe]',
    standalone: true,
})
export class PlatformSwipeDirective {
    private readonly el = inject(ElementRef);
    private readonly renderer = inject(Renderer2);

    readonly swipeLeft = output<void>();
    readonly swipeRight = output<void>();

    private startX = 0;
    private startY = 0;

    private readonly threshold = 40;
    private readonly maxVerticalDelta = 50;

    constructor() {
        this.renderer.listen(this.el.nativeElement, 'touchstart', (e: TouchEvent) => {
            const touch = e.touches?.[0] ?? e.changedTouches?.[0];
            if (touch) {
                this.startX = touch.clientX;
                this.startY = touch.clientY;
            }
        });

        this.renderer.listen(this.el.nativeElement, 'touchend', (e: TouchEvent) => {
            const touch = e.changedTouches?.[0] ?? e.touches?.[0];
            if (!touch) return;

            const endX = touch.clientX;
            const endY = touch.clientY;

            const deltaX = endX - this.startX;
            const deltaY = Math.abs(endY - this.startY);

            if (deltaY <= this.maxVerticalDelta) {
                if (deltaX <= -this.threshold) {
                    this.swipeLeft.emit();
                } else if (deltaX >= this.threshold) {
                    this.swipeRight.emit();
                }
            }
        });
    }
}
