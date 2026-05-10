import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({ selector: '[menuSlot]', standalone: true })
export class MenuSlotDirective {
    readonly template = inject(TemplateRef);

    readonly menuSlot = input.required<string>();
}
