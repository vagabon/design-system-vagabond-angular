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
            const scrolls = document.getElementsByClassName('scroll');
            Array.from(scrolls).forEach((scroll) => {
                scroll?.scrollTo(0, 0);
            });
            this.router.navigate([url]);
        } else {
            this.dsvLink.emit();
        }
    }
}
