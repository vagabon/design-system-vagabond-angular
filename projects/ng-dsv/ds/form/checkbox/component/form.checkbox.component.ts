import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'dsv-form-checkbox',
  imports: [ReactiveFormsModule],
  templateUrl: './form.checkbox.component.html',
  styleUrls: [
    '../../input/component/form.input.component.scss',
    './form.checkbox.component.scss',
  ],
})
export class FormCheckboxComponent {
  form = input.required<FormGroup>();
  field = input.required<string>();
  withLabel = input<boolean>(true);

  change = output<string>();

  doChange() {
    this.change.emit(this.form().value[this.field()]);
  }
}
