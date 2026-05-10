import { Component, effect, inject, input, output, signal } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { TranslatePipe } from '@ngx-translate/core';
import { ModalService } from '../../service/modal.service';
import { DsvModalComponent } from '../modal.component';

@Component({
    selector: 'dsv-modal-alert',
    imports: [DsvModalComponent, DsvButtonComponent, TranslatePipe],
    templateUrl: './modal-alert.component.html',
    styleUrls: ['./modal-alert.component.scss'],
})
export class DsvModalAlertComponent {
    readonly id = input.required<string>();
    readonly titleText = input<string>('title');
    readonly text = input<string>('text');
    readonly button = input<string>('button');
    readonly buttonClose = input<string>();
    readonly callback = output<void>();

    readonly isOpen = signal<boolean>(false);

    readonly modalService = inject(ModalService);

    constructor() {
        effect(() => {
            this.isOpen.set(this.modalService.getSignal(this.id() ?? false));
        });
    }

    doClick(): void {
        this.modalService.toggle(this.id());
        this.callback.emit();
    }

    doClickClose(): void {
        this.modalService.close(this.id());
    }
}
