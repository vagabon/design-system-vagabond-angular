import { Component, input } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { FormSignalErrorComponent } from '../../error/component/form.signal.error.component';
import { FormSignalLabelComponent } from '../../label/component/form.signal.label.component';
import { FormSignalInputBase } from '../../public-api';

@Component({
  selector: 'dsv-form-signal-select',
  imports: [Field, FormSignalLabelComponent, FormSignalErrorComponent],
  templateUrl: './form.signal.select.component.html',
  styleUrls: [
    '../../../reactive/input/component/form.reactive.input.component.scss',
    '../../../reactive/select/component/form.reactive.select.component.scss',
  ],
})
export class FormSignalSelectComponent<T> extends FormSignalInputBase<T> {

  list = input<(ApiDto & { name: string })[]>([]);

}
