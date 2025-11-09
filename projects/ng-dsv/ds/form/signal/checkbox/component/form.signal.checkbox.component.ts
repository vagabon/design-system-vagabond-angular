import { Component } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { FormSignalLabelComponent } from '../../label/component/form.signal.label.component';
import { FormSignalInputBase } from '../../public-api';

@Component({
  selector: 'dsv-form-signal-checkbox',
  imports: [Field, FormSignalLabelComponent],
  templateUrl: './form.signal.checkbox.component.html',
  styleUrls: [
    '../../../legacy/input/component/form.input.component.scss',
    '../../../legacy/checkbox/component/form.checkbox.component.scss',
  ],
})
export class FormSignalCheckboxComponent<T> extends FormSignalInputBase<T> {

}
