import { Component } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { FormSignalLabelComponent } from '../../label/component/form.signal.label.component';
import { FormSignalInputBase } from '../../public-api';

@Component({
  selector: 'dsv-form-signal-checkbox',
  imports: [Field, FormSignalLabelComponent],
  templateUrl: './form.signal.checkbox.component.html',
  styleUrls: [
    '../../../reactive/input/component/form.reactive.input.component.scss',
    '../../../reactive/checkbox/component/form.reactive.checkbox.component.scss',
  ],
})
export class FormSignalCheckboxComponent<T> extends FormSignalInputBase<T> {

}
