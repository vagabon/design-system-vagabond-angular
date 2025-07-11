import { Component, effect, input, signal } from "@angular/core";
import { AbstractControl, Validators } from "@angular/forms";

@Component({
  selector: 'dsv-form-label',
  templateUrl: './form.label.component.html',
  styleUrls: ['./form.label.component.scss'],
})
export class FormLabelComponent {
  label = input.required<string>();
  field = input<AbstractControl>();
  show = input<boolean>(true);

  isRequired = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.isRequired.set(this.field()?.hasValidator?.(Validators.required) ?? false);
    })
  }
}