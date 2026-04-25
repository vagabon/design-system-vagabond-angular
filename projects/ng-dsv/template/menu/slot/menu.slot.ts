import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({ selector: '[menuSlot]', standalone: true })
export class MenuSlotDirective {
    @Input() menuSlot!: string;
    constructor(public tpl: TemplateRef<any>) {}
}
