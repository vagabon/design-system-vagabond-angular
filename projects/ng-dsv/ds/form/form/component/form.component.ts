import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input()
  form!: FormGroup;

  constructor() {}

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulaire envoyé !', this.form.value);
    }
  }
}
