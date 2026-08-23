import { Directive, input, output } from '@angular/core';
import { ColorType } from '@ng-vagabond-lab/ng-dsv/type';

@Directive({
    selector: 'a[dsvLinkExternal]',
    host: {
        '[class]': "color() + ' text bold'",
        target: '_blank',
        rel: 'noopener noreferrer',
        '(click)': 'onClick($event)',
    },
})
export class RouterExternalPipe {
    readonly color = input<ColorType>('secondary');

    readonly dsvLinkExternal = output<void>();

    onClick(event: Event): void {
        event.stopPropagation();
        this.dsvLinkExternal.emit();
    }
}
