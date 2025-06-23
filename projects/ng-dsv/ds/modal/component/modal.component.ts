import { Component, effect, inject, input, signal } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { MenuService } from '@ng-vagabond-lab/ng-dsv/ds/menu';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-modal',
  imports: [DsvButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  id = input.required<string>();
  titleText = input.required<string>();
  class = input<string>('');

  isOpen = signal<boolean>(false);

  modalService = inject(ModalService);
  menuService = inject(MenuService);

  constructor() {
    effect(() => {
      this.isOpen.set(this.modalService.getSignal(this.id()) ?? false);
      if (this.isOpen()) {
        this.menuService.isMenuOpen.set(false);
      }
    });
  }

  close = () => {
    this.modalService.close(this.id());
  };
}
