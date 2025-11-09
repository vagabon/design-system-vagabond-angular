import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormReactiveLabelComponent } from '../../label/component/form.reactive.label.component';

@Component({
  selector: 'dsv-form-reactive-checkbox',
  imports: [ReactiveFormsModule, FormReactiveLabelComponent],
  templateUrl: './form.reactive.checkbox.component.html',
  styleUrls: [
    '../../input/component/form.reactive.input.component.scss',
    './form.reactive.checkbox.component.scss',
  ],
})
export class FormReactiveCheckboxComponent {
  form = input.required<FormGroup>();
  field = input.required<string>();
  withLabel = input<boolean>(true);

  change = output<string>();

  doChange() {
    this.change.emit(this.form().value[this.field()]);
  }
}
