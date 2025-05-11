import { Component, Input, Signal, signal } from '@angular/core';
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
  @Input()
  search: string = '';
  @Input({ required: true })
  onSearch!: Signal<(search: string) => void>;

  afterInit() {
    this.form = this.formBuilder.group({
      search: [this.search],
    });
  }

  onTap = signal(() => {
    this.onSearch()(this.form.value.search);
  });
}
