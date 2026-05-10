import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DsvFormReactiveLabelComponent } from '../../label/component/form-reactive-label.component';

@Component({
    selector: 'dsv-form-reactive-checkbox',
    imports: [ReactiveFormsModule, DsvFormReactiveLabelComponent],
    templateUrl: './form-reactive-checkbox.component.html',
    styleUrls: [
        '../../input/component/form-reactive-input.component.scss',
        './form-reactive-checkbox.component.scss',
    ],
})
export class DsvFormReactiveCheckboxComponent {
    readonly form = input.required<FormGroup>();
    readonly field = input.required<string>();
    readonly withLabel = input<boolean>(true);

    readonly callbackChange = output<string>();

    doChange(): void {
        this.callbackChange.emit(this.form().value[this.field()]);
    }
}
