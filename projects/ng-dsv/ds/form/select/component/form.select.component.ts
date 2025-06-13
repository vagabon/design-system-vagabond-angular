import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';

@Component({
  selector: 'dsv-form-select',
  imports: [ReactiveFormsModule],
  templateUrl: './form.select.component.html',
  styleUrls: [
    '../../input/component/form.input.component.scss',
    './form.select.component.scss',
  ],
})
export class SelectComponent {
  form = input.required<FormGroup>();
  field = input.required<string>();
  withLabel = input<boolean>(true);

  list = input<(ApiDto & { name: string })[]>([]);

  change = output<string>();

  doChange() {
    this.change.emit(this.form().value[this.field()]);
  }
}
