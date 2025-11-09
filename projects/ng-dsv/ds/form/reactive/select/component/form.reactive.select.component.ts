import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { FormReactiveErrorComponent } from '../../error/component/form.reactive.error.component';
import { FormReactiveLabelComponent } from '../../label/component/form.reactive.label.component';

@Component({
  selector: 'dsv-form-reactive-select',
  imports: [ReactiveFormsModule, FormReactiveLabelComponent, FormReactiveErrorComponent],
  templateUrl: './form.reactive.select.component.html',
  styleUrls: [
    '../../input/component/form.reactive.input.component.scss',
    './form.reactive.select.component.scss',
  ],
})
export class FormReactiveSelectComponent {
  form = input.required<FormGroup>();
  field = input.required<string>();
  withLabel = input<boolean>(true);

  list = input<(ApiDto & { name: string })[]>([]);

  change = output<string>();

  doChange() {
    this.change.emit(this.form().value[this.field()]);
  }
}
