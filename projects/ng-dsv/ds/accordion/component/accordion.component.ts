import { afterNextRender, Component, effect, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'dsv-accordion',
    imports: [TranslatePipe],
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    host: {
        '[id]': 'uuid()',
    },
})
export class DsvAccordionComponent {
    readonly open = input<boolean>(false);
    readonly titleText = input<string>('');
    readonly color = input<string>('');

    readonly uuid = signal<string>('accordion-' + crypto.randomUUID());
    readonly isOpen = signal<boolean>(this.open());
    readonly hasContent = signal<boolean>(false);

    constructor() {
        afterNextRender(() => {
            const contentEl = document.querySelector(
                `[id="${this.uuid()}"] > *:not([class*="dsv-accordion-header"])`,
            );
            const isEmpty = contentEl?.childNodes.length === 0 || contentEl?.textContent?.trim() === '';
            this.hasContent.set(!isEmpty);
        });

        effect(() => {
            this.isOpen.set(this.open());
        });
    }

    doToogle(): void {
        this.isOpen.update((tootle) => !tootle);
    }
}
