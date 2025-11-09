import { AfterViewInit, Component, ElementRef, input, ViewChild } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { INPUT_TYPE } from '@ng-vagabond-lab/ng-dsv/type';
import { FormSignalInputBase } from '../../base/form.signal.input.base';
import { FormSignalErrorComponent } from '../../error/component/form.signal.error.component';
import { FormSignalLabelComponent } from '../../label/component/form.signal.label.component';

@Component({
  selector: 'dsv-form-signal-input',
  imports: [
    Field,
    FormSignalLabelComponent,
    FormSignalErrorComponent
  ],
  templateUrl: './form.signal.input.component.html',
  styleUrl: '../../../reactive/input/component/form.reactive.input.component.scss',
})
export class FormSignalInputComponent<T> extends FormSignalInputBase<T> implements AfterViewInit {
  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;

  type = input<INPUT_TYPE>('text');
  icon = input<string>();

  ngAfterViewInit() {
    if (this.input?.nativeElement) {
      this.input.nativeElement.type = this.type();
    }
  }

}
