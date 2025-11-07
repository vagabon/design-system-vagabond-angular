import { Component, effect, input, output } from '@angular/core';
import {
  BaseFormComponent,
  FormComponent,
  FormInputComponent,
} from '../../public-api';

@Component({
  selector: 'form-searchbar',
  imports: [FormComponent, FormInputComponent],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent extends BaseFormComponent {
  search = input<string>('');
  onSearch = output<string>();

  constructor() {
    super();
    effect(() => {
      this.form = this.formBuilder.group({
        search: [this.search()],
      });
    });
  }

  onSend(value: string) {
    this.onSearch.emit(value);
  }
}
