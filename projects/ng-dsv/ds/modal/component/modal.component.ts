import { Component, effect, inject, input, signal } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { MenuService } from '@ng-vagabond-lab/ng-dsv/ds/menu';
import { ModalService } from '../service/modal.service';

@Component({
    selector: 'dsv-modal',
    imports: [DsvButtonComponent],
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    host: {
        '(document:keydown.escape)': 'onEscapeKey()',
    },
})
export class DsvModalComponent {
    readonly modalService = inject(ModalService);
    readonly menuService = inject(MenuService);

    readonly id = input.required<string>();
    readonly class = input<string>('');
    readonly titleText = input.required<string>();
    readonly canEchap = input<boolean>(true);

    readonly isOpen = signal<boolean>(false);

    constructor() {
        effect(() => {
            this.isOpen.set(this.modalService.getSignal(this.id()) ?? false);
            if (this.isOpen()) {
                this.menuService.isMenuOpen.set(false);
            }
        });
    }

    onEscapeKey(): void {
        if (this.isOpen() && this.canEchap()) {
            this.close();
        }
    }

    close(): void {
        this.modalService.close(this.id());
    }
}
