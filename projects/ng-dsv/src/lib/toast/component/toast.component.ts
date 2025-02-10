import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { ToastService } from './../service/toast.service';

export type Theme = {
  primary: string;
  text: string;
};

@Component({
  selector: 'dsv-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class DsvToastComponent {
  toastService = inject(ToastService);

  constructor() {
    effect(() => {
      for (const toast of this.toastService.toasts()) {
        if (this.toastService.toastShows().length < 10) {
          this.toastService.toastShows.update((toasts) => [...toasts, toast]);
          let duration = 0;
          setInterval(() => {
            duration += 10;
            if (duration > toast.duration!) {
              this.toastService.closeToast(toast.uuid!);
            } else {
              this.toastService.toastShows.update((toasts) =>
                toasts.map((oneToast) => {
                  if (oneToast.uuid === toast.uuid) {
                    oneToast.durationLeft = toast.duration! - duration;
                  }
                  return oneToast;
                })
              );
            }
          }, 10);
          this.toastService.removeToastFromQueue(toast.uuid!);
        }
      }
    });
  }

  ngOnInit() {
    this.toastService.showToast({
      text: 'test',
      type: 'success',
      filled: true,
    });
  }
}
