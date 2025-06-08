import { Component, input, output, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'dsv-form-input',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './form.input.component.html',
  styleUrl: './form.input.component.scss',
})
export class FormInputComponent {
  form = input.required<FormGroup>();
  field = input.required<string>();
  type = input<string>('text');
  withLabel = input<boolean>(true);
  required = input<boolean>(true);
  icon = input<string>();

  onSend = output<string>();

  error = signal<string>('');

  onEnter() {
    this.onSend.emit(this.form().value[this.field()]);
  }

  onChange() {
    const error = this.form().controls[this.field()].errors;
    let errorText = "";
    if (error) {
      console.log(error);
    }
    if (error?.['required']) {
      errorText = "Ce champ est obligatoire";
    }
    this.error.set(errorText);
  }
}
