import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'form-input',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './form.input.component.html',
  styleUrl: './form.input.component.scss',
})
export class FormInputComponent {
  form = input.required<FormGroup>();
  field = input.required<string>();
  withLabel = input<boolean>(true);

  onSend = output<string>();

  onEnter() {
    this.onSend.emit(this.form().value[this.field()]);
  }
}
