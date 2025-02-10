import { Injectable, signal, WritableSignal } from '@angular/core';
import { IToastDto } from '../dto/toast.dto';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastShows: WritableSignal<IToastDto[]> = signal([]);
  toasts: WritableSignal<IToastDto[]> = signal([]);

  showToast(toast: IToastDto) {
    toast.uuid = crypto.randomUUID();
    toast.type = toast.type || 'success';
    toast.duration = toast.duration || 4000;
    toast.durationLeft = toast.duration;
    toast.filled = toast.filled || false;
    this.toasts.update((toasts) => [...toasts, toast]);
  }

  closeToast(uuid: string) {
    this.toastShows.update((toasts) => toasts.filter((t) => t.uuid !== uuid));
  }

  removeToastFromQueue(uuid: string) {
    this.toasts.update((toasts) => toasts.filter((t) => t.uuid !== uuid));
  }
}
