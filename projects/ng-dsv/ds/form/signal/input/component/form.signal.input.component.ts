import { Component, input } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { INPUT_TYPE } from '@ng-vagabond-lab/ng-dsv/type';
import { FormSignalInputBase } from '../../base/form.signal.input.base';
import { FormSignalErrorComponent } from '../../error/component/form.signal.error.component';
import { FormSignalLabelComponent } from '../../label/component/form.signal.label.component';

@Component({
  selector: 'dsv-form-signal-input',
  imports: [
    FormField,
    FormSignalLabelComponent,
    FormSignalErrorComponent
  ],
  templateUrl: './form.signal.input.component.html',
  styleUrl: '../../../reactive/input/component/form.reactive.input.component.scss',
})
export class FormSignalInputComponent<T> extends FormSignalInputBase<T> {

  type = input<INPUT_TYPE>('text');
  icon = input<string>();

}
