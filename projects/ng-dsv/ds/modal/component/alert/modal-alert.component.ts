import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { ModalService } from '../../service/modal.service';
import { ModalComponent } from '../modal.component';

@Component({
  selector: 'app-modal-alert',
  imports: [ModalComponent, DsvButtonComponent],
  templateUrl: './modal-alert.component.html',
})
export class ModalAlertComponent {
  id = input.required<string>();
  title = input<string>('title');
  text = input<string>('text');
  button = input<string>('button');
  buttonClose = input<string>();
  callback = output<void>();

  isOpen = signal<boolean>(false);

  modalService = inject(ModalService);

  constructor() {
    effect(() => {
      this.isOpen.set(this.modalService.getSignal(this.id()));
    });
  }

  doClick = () => {
    this.modalService.toggle(this.id());
    this.callback.emit();
  };

  doClickClose = () => {
    this.modalService.close(this.id());
  };
}
