import { Component, inject, input } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { ColorType } from '@ng-vagabond-lab/ng-dsv/type';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'app-modal-button',
  imports: [DsvButtonComponent],
  templateUrl: './modal-button.component.html',
})
export class ModalButtonComponent {
  modalService = inject(ModalService);

  id = input.required<string>();
  icon = input<string>('');
  text = input<string>('');
  color = input<ColorType>('primary');

  doToogle = () => {
    this.modalService.toggle(this.id());
  };
}
