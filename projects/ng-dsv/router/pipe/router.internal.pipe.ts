import { Directive, ElementRef, inject, output } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: 'a[dsvLink]',
    host: {
        class: 'text',
        '(click)': 'onClick($event)',
    },
})
export class RouterInternalPipe {
    readonly router = inject(Router);
    readonly element = inject(ElementRef);

    readonly dsvLink = output<void>();

    onClick(event: Event) {
        event.stopPropagation();
        event.preventDefault();
        const url = this.element.nativeElement.getAttribute('href');
        if (url && url !== '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.router.navigate([url]);
        } else {
            this.dsvLink.emit();
        }
    }
}
