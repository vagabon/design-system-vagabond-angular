import { Component, effect, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'dsv-form-input',
  imports: [ReactiveFormsModule],
  templateUrl: './form.input.component.html',
  styleUrl: './form.input.component.scss',
})
export class FormInputComponent {
  form = input.required<FormGroup>();
  field = input.required<string>();
  type = input<string>('text');
  withLabel = input<boolean>(true);
  required = input<boolean>(false);
  icon = input<string>();

  onSend = output<string>();

  isRequired = false;

  constructor() {
    effect(() => {
      this.isRequired = this.form().get(this.field())?.hasValidator?.(Validators.required) ?? false;
    })
  }

  onEnter() {
    this.onSend.emit(this.form().value[this.field()]);
  }
}
