import { Component, inject, input, output } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { ButtonVariantType, ColorType } from '@ng-vagabond-lab/ng-dsv/type';
import { ModalService } from '../../service/modal.service';

@Component({
    selector: 'dsv-modal-button',
    imports: [DsvButtonComponent],
    templateUrl: './modal-button.component.html',
    styleUrls: ['../../../button/component/button.component.scss', './modal-button.component.scss'],
})
export class DsvModalButtonComponent {
    readonly modalService = inject(ModalService);

    readonly modalName = input.required<string>();
    readonly icon = input<string>('');
    readonly variant = input<ButtonVariantType>('contained');
    readonly text = input<string>('');
    readonly color = input<ColorType>('primary');

    readonly callback = output<void>();

    doToogle(): void {
        this.callback.emit();
        this.modalService.toggle(this.modalName());
    }
}
