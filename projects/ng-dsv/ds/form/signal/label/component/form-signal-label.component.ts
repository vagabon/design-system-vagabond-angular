import { Component, effect, input, signal } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
    selector: 'dsv-form-signal-label',
    templateUrl: './form-signal-label.component.html',
    styleUrls: ['../../../reactive/label/component/form-reactive-label.component.scss'],
})
export class DsvFormSignalLabelComponent<T> {
    readonly label = input.required<string>();
    readonly name = input.required<string>();
    readonly signal = input.required<FieldState<T>>();
    readonly show = input<boolean>(true);

    readonly isRequired = signal<boolean>(false);

    constructor() {
        effect(() => {
            this.isRequired.set(this.signal().required());
        });
    }
}
