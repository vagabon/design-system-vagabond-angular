import { Component, effect, inject, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { isCallback } from '@ng-vagabond-lab/ng-dsv/base';

@Component({
    selector: 'dsv-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
})
export class DsvItemComponent {
    readonly router = inject(Router);

    readonly icon = input<string>('');
    readonly text = input<string>('');
    readonly url = input<string>();
    readonly small = input<boolean>(false);

    readonly callback = output<void>();

    readonly isCallback = signal<boolean>(false);

    constructor() {
        effect(() => {
            this.isCallback.set(isCallback(this.callback));
        });
    }

    doClick(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        if (this.url()) {
            this.router.navigate([this.url()]);
        }
        this.isCallback() && this.callback.emit();
    }
}
