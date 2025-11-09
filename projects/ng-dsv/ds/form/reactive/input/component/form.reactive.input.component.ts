import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { INPUT_TYPE } from '@ng-vagabond-lab/ng-dsv/type';
import { FormReactiveErrorComponent } from '../../error/component/form.reactive.error.component';
import { FormReactiveLabelComponent } from '../../label/component/form.reactive.label.component';

@Component({
  selector: 'dsv-form-reactive-input',
  imports: [ReactiveFormsModule, FormReactiveLabelComponent, FormReactiveErrorComponent],
  templateUrl: './form.reactive.input.component.html',
  styleUrl: './form.reactive.input.component.scss',
})
export class FormReactiveInputComponent {
  form = input.required<FormGroup>();
  field = input.required<string>();
  type = input<INPUT_TYPE>('text');
  withLabel = input<boolean>(true);
  required = input<boolean>(false);
  icon = input<string>();

  onSend = output<string>();

  onEnter() {
    this.onSend.emit(this.form().value[this.field()]);
  }
}
