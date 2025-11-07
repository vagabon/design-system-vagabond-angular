import { AfterViewInit, Component, ElementRef, input, ViewChild } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { FormSignalInputBase } from '../../base/form.signal.input.base';
import { FormSignalErrorComponent } from '../../error/component/form.signal.error.component';
import { FormSignalLabelComponent } from '../../label/component/form.signal.label.component';

export type INPUT_TYPE = "text" | "password" | "textarea" | "email" | "number" | "date" | "time" | "datetime-local" |
  "month" | "week" | "url" | "search" | "tel" | "color" | "range" | "file" | "hidden";

@Component({
  selector: 'dsv-form-signal-input',
  imports: [
    Field,
    FormSignalLabelComponent,
    FormSignalErrorComponent
  ],
  templateUrl: './form.signal.input.component.html',
  styleUrl: '../../../legacy/input/component/form.input.component.scss',
})
export class FormSignalInputComponent<T> extends FormSignalInputBase<T> implements AfterViewInit {
  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;

  type = input<string>('text');
  icon = input<string>();

  ngAfterViewInit() {
    if (this.input?.nativeElement) {
      this.input.nativeElement.type = this.type();
    }
  }

}
