import { Component, effect, input, signal } from "@angular/core";
import { FieldState } from "@angular/forms/signals";

@Component({
  selector: 'dsv-form-signal-label',
  templateUrl: './form.signal.label.component.html',
  styleUrls: ['../../../reactive/label/component/form.reactive.label.component.scss'],
})
export class FormSignalLabelComponent<T> {
  label = input.required<string>();
  signal = input.required<FieldState<T>>();
  show = input<boolean>(true);

  isRequired = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.isRequired.set(this.signal().required());
    })
  }
}