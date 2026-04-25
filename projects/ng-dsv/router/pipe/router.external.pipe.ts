import { Directive, output } from '@angular/core';

@Directive({
    selector: 'a[dsvLinkExternal]',
    host: {
        class: 'primary text',
        target: '_blank',
        rel: 'noopener noreferrer',
        '(click)': 'onClick($event)',
    },
})
export class RouterExternalPipe {
    readonly dsvLinkExternal = output<void>();

    onClick(event: Event) {
        event.stopPropagation();
        this.dsvLinkExternal.emit();
    }
}
