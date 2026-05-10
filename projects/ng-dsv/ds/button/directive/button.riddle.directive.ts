import { Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';

@Directive({
    selector: '[buttonRipple]',
    host: {
        '(click)': 'onClick($event)',
    },
})
export class ButtonRippleDirective {
    readonly element = inject(ElementRef<HTMLElement>);
    readonly renderer = inject(Renderer2);
    readonly platformService = inject(PlatformService);

    readonly rippleColor = input<string>('rgba(255, 255, 255, 0.35');
    readonly rippleDuration = input<number>(550);

    constructor() {
        if (!this.platformService.isPlatformBrowser()) {
            return;
        }

        const host = this.element.nativeElement;

        const position = getComputedStyle(host).position;
        if (position === 'static') {
            this.renderer.setStyle(host, 'position', 'relative');
        }
        this.renderer.setStyle(host, 'overflow', 'hidden');
    }

    onClick(event: MouseEvent): void {
        const host = this.element.nativeElement;
        const rect = host.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const circle = this.renderer.createElement('span') as HTMLElement;
        circle.classList.add('ripple');

        this.renderer.setStyle(circle, 'position', 'absolute');
        this.renderer.setStyle(circle, 'width', `${size}px`);
        this.renderer.setStyle(circle, 'height', `${size}px`);
        this.renderer.setStyle(circle, 'left', `${x}px`);
        this.renderer.setStyle(circle, 'top', `${y}px`);
        this.renderer.setStyle(circle, 'border-radius', '50%');
        this.renderer.setStyle(circle, 'background', this.rippleColor());
        this.renderer.setStyle(circle, 'transform', 'scale(0)');
        this.renderer.setStyle(circle, 'pointer-events', 'none');
        this.renderer.setStyle(circle, 'animation', `ripple ${this.rippleDuration()}ms linear`);

        this.renderer.appendChild(host, circle);

        circle.addEventListener('animationend', () => {
            this.renderer.removeChild(host, circle);
        });
    }
}
