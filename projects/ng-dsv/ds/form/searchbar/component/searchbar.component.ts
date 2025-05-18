import { Component, input, output } from '@angular/core';
import {
  BaseFormComponent,
  FormComponent,
  FormInputComponent,
} from '../../public-api';

@Component({
  selector: 'form-searchbar',
  imports: [FormComponent, FormInputComponent],
  standalone: true,
  templateUrl: './searchbar.component.html',
})
export class SearchbarComponent extends BaseFormComponent {
  search = input<string>('');
  onSearch = output<string>();

  afterInit() {
    this.form = this.formBuilder.group({
      search: [this.search()],
    });
  }

  onTap(value: string) {
    this.onSearch.emit(value);
  }
}
