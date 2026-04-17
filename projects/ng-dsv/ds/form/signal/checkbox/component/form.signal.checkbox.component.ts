import { Component } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { FormSignalLabelComponent } from '../../label/component/form.signal.label.component';
import { FormSignalInputBase } from '../../public-api';

@Component({
    selector: 'dsv-form-signal-checkbox',
    imports: [FormField, FormSignalLabelComponent],
    templateUrl: './form.signal.checkbox.component.html',
    styleUrls: [
        '../../../reactive/input/component/form.reactive.input.component.scss',
        '../../../reactive/checkbox/component/form.reactive.checkbox.component.scss',
    ],
})
export class FormSignalCheckboxComponent<T> extends FormSignalInputBase<T> {
    getBooleanSignal() {
        return this.form()?.[this.fieldName() as keyof FieldTree<T, string | number>] as FieldTree<
            boolean,
            string | number
        >;
    }
}
