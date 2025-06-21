import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MAX_TOASTS, ToastService } from '../service/toast.service';

@Component({
  selector: 'dsv-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class DsvToastComponent {
  protected readonly toastService = inject(ToastService);

  constructor() {
    effect(() => {
      for (const toast of this.toastService.toasts()) {
        if (this.toastService.toastShows().length < MAX_TOASTS) {
          this.toastService.consumeToast(toast);
        }
      }
    });
  }
}
