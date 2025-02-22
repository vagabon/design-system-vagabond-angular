import { Injectable, signal, WritableSignal } from '@angular/core';
import { IToastDto } from '../dto/toast.dto';

export const MAX_TOASTS = 10;
export const DURATION_DEFAULT = 5000;
export const DURATION_TIMEOUT = 10;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastShows: WritableSignal<IToastDto[]> = signal([]);
  toasts: WritableSignal<IToastDto[]> = signal([]);

  showToast(toast: IToastDto) {
    toast.uuid = crypto.randomUUID();
    toast.type = toast.type ?? 'success';
    toast.duration = toast.duration ?? DURATION_DEFAULT;
    toast.durationLeft = toast.duration;
    toast.filled = toast.filled ?? false;
    this.toasts.update((toasts) => [...toasts, toast]);
  }

  consumeToast(toast: IToastDto) {
    this.toastShows.update((toasts) => [...toasts, toast]);
    let duration = 0;
    const interval = setInterval(() => {
      duration += DURATION_TIMEOUT;
      if (duration > toast.duration!) {
        clearInterval(interval);
        this.closeToast(toast.uuid!);
      } else {
        this.toastShows.update((toasts) =>
          toasts.map((oneToast) => {
            if (oneToast.uuid === toast.uuid) {
              oneToast.durationLeft = toast.duration! - duration;
            }
            return oneToast;
          })
        );
      }
    }, DURATION_TIMEOUT);
    this.removeToastFromQueue(toast.uuid!);
  }

  closeToast(uuid: string) {
    this.toastShows.update((toasts) => toasts.filter((t) => t.uuid !== uuid));
  }

  removeToastFromQueue(uuid: string) {
    this.toasts.update((toasts) => toasts.filter((t) => t.uuid !== uuid));
  }
}
