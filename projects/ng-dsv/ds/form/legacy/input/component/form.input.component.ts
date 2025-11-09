import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { INPUT_TYPE } from '@ng-vagabond-lab/ng-dsv/type';
import { FormErrorComponent } from '../../error/component/form.error.component';
import { FormLabelComponent } from '../../label/component/form.label.component';

@Component({
  selector: 'dsv-form-input',
  imports: [ReactiveFormsModule, FormLabelComponent, FormErrorComponent],
  templateUrl: './form.input.component.html',
  styleUrl: './form.input.component.scss',
})
export class FormInputComponent {
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
