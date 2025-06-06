import { Component, inject, input } from "@angular/core";
import { DsvButtonComponent } from "@ng-vagabond-lab/ng-dsv/ds/button";
import { ColorType } from "@ng-vagabond-lab/ng-dsv/type";
import { ModalService } from "../../service/modal.service";

@Component({
    selector: 'app-modal-button',
    imports: [
        DsvButtonComponent
    ],
    standalone: true,
    templateUrl: './modal-button.component.html',
})
export class ModalButtonComponent {
    id = input.required<string>();
    icon = input<string>('');
    text = input<string>('');
    color = input<ColorType>('primary');

    modalService = inject(ModalService);

    doToogle = () => {
        this.modalService.toggle(this.id());
    }
}