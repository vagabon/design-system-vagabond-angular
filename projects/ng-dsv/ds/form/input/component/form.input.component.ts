import { Component, Input, Signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'form-input',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './form.input.component.html',
  styleUrl: './form.input.component.scss',
})
export class FormInputComponent {
  @Input()
  form!: FormGroup;
  @Input()
  field!: string;
  @Input()
  withLabel: boolean = true;

  @Input({ required: true }) onSend!: Signal<() => void>;

  onEnter() {
    this.onSend()();
  }
}
