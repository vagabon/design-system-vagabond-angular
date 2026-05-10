import { afterNextRender, Component, effect, ElementRef, input, signal, viewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'dsv-accordion',
    imports: [TranslatePipe],
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
})
export class DsvAccordionComponent {
    readonly open = input<boolean>(false);
    readonly titleText = input<string>('');
    readonly color = input<string>('');

    readonly checkboxRef = viewChild<ElementRef>('accordionContent');

    readonly isOpen = signal<boolean>(this.open());
    readonly hasContent = signal<boolean>(false);

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

    doToogle(): void {
        if (!this.hasContent()) {
            return;
        }
        this.isOpen.update((tootle) => !tootle);
    }
}
