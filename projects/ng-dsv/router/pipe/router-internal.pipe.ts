import { Directive, ElementRef, inject, output } from '@angular/core';
import { RouterService } from '../public-api';

@Directive({
    selector: 'a[dsvLink]',
    host: {
        class: 'text',
        '(click)': 'onClick($event)',
    },
})
export class RouterInternalPipe {
    readonly routerService = inject(RouterService);
    readonly element = inject(ElementRef);

    readonly dsvLink = output<void>();

    onClick(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        const url = this.element.nativeElement.getAttribute('href');
        if (url && url !== '#') {
            this.routerService.navigate([url]);
        } else {
            this.dsvLink.emit();
        }
    }
}
