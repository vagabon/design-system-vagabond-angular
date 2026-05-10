import { CommonModule } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { DURATION_DEFAULT, MAX_TOASTS, ToastService } from '../service/toast.service';

@Component({
    selector: 'dsv-toast',
    imports: [CommonModule],
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
})
export class DsvToastComponent {
    readonly toastService = inject(ToastService);

    readonly duration = input<number>(DURATION_DEFAULT);
    readonly max = input<number>(MAX_TOASTS);

    constructor() {
        effect(() => {
            for (const toast of this.toastService.toasts()) {
                if (this.toastService.toastShows().length < this.max()) {
                    this.toastService.consumeToast(toast);
                }
            }
        });
    }
}
