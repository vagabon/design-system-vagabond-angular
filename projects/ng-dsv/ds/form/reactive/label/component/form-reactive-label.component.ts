import { Component, effect, input, signal } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';

@Component({
    selector: 'dsv-form-reactive-label',
    templateUrl: './form-reactive-label.component.html',
    styleUrls: ['./form-reactive-label.component.scss'],
})
export class DsvFormReactiveLabelComponent {
    readonly label = input.required<string>();
    readonly field = input<AbstractControl>();
    readonly show = input<boolean>(true);

    readonly isRequired = signal<boolean>(false);

    constructor() {
        effect(() => {
            this.isRequired.set(this.field()?.hasValidator?.(Validators.required) ?? false);
        });
    }
}
