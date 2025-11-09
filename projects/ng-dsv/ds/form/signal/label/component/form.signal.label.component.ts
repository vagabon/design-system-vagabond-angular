import { Component, effect, input, signal } from "@angular/core";
import { FieldTree } from "@angular/forms/signals";

@Component({
  selector: 'dsv-form-signal-label',
  templateUrl: './form.signal.label.component.html',
  styleUrls: ['../../../reactive/label/component/form.reactive.label.component.scss'],
})
export class FormSignalLabelComponent<T> {
  label = input.required<string>();
  show = input<boolean>(true);
  fieldName = input<FieldTree<T, string | number>>();

  isRequired = signal<boolean>(false);

  constructor() {
    effect(() => {
      // FIXME : remmettre le isRequired en dynamique
      //this.isRequired.set(this.field()?.hasValidator?.(Validators.required) ?? false);
    })
  }
}