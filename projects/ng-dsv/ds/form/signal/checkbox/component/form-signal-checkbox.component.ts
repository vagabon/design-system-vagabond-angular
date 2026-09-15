import { Component, ElementRef, viewChild } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { DsvBaseFormSignalInputComponent } from '../../form/base/input/base-form-signal-input.component';
import { DsvFormSignalLabelComponent } from '../../label/component/form-signal-label.component';

@Component({
    selector: 'dsv-form-signal-checkbox',
    imports: [FormField, DsvFormSignalLabelComponent],
    templateUrl: './form-signal-checkbox.component.html',
    styleUrls: [
        '../../../reactive/input/component/form-reactive-input.component.scss',
        '../../../reactive/checkbox/component/form-reactive-checkbox.component.scss',
    ],
})
export class DsvFormSignalCheckboxComponent<T> extends DsvBaseFormSignalInputComponent<T> {
    readonly checkboxRef = viewChild<ElementRef>('checkbox');

    getBooleanSignal(): FieldTree<boolean, string | number> {
        return this.form()?.[this.fieldName() as keyof FieldTree<T, string | number>] as FieldTree<
            boolean,
            string | number
        >;
    }

    triggerCheckbox(): void {
        this.checkboxRef()?.nativeElement.querySelector('input').click();
    }
}
