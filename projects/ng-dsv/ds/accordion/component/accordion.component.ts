import { afterNextRender, Component, effect, ElementRef, input, signal, viewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'dsv-accordion',
    imports: [TranslatePipe],
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
})
export class DsvAccordionComponent {
    open = input<boolean>(false);
    titleText = input<string>('');
    color = input<string>('');

    readonly checkboxRef = viewChild<ElementRef>('accordionContent');

    isOpen = signal<boolean>(this.open());
    hasContent = signal<boolean>(false);

    constructor() {
        afterNextRender(() => {
            const contentEl = document.querySelector(
                'dsv-accordion > *:not([class*="dsv-accordion-header"])',
            );
            const isEmpty = contentEl?.childNodes.length === 0 || contentEl?.textContent?.trim() === '';
            this.hasContent.set(!isEmpty);
        });

        effect(() => {
            this.isOpen.set(this.open());
        });
    }

    doToogle() {
        if (!this.hasContent()) {
            return;
        }
        this.isOpen.update((tootle) => !tootle);
    }
}
