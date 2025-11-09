import { Component, input, output, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { BaseFormSignalComponent } from '../../form/base/base.form.signal.component';
import {
  FormSignalComponent,
  FormSignalInputComponent
} from '../../public-api';

@Component({
  selector: 'form-signal-searchbar',
  imports: [FormSignalComponent, FormSignalInputComponent],
  templateUrl: './form.signal.searchbar.component.html',
  styleUrls: ['../../../legacy/searchbar/component/searchbar.component.scss'],
})
export class FormSignalSearchbarComponent extends BaseFormSignalComponent {
  search = input<string>('');
  onSearch = output<string>();

  form = form(signal({ search: this.search() }));

  onSend(value: string) {
    this.onSearch.emit(value);
  }
}
