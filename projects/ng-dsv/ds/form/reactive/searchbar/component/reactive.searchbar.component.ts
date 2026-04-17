import { Component, effect, input, output } from '@angular/core';
import {
    BaseFormReactiveComponent,
    FormReactiveComponent,
    FormReactiveInputComponent,
} from '../../public-api';

@Component({
    selector: 'dsv-form-reactive-searchbar',
    imports: [FormReactiveComponent, FormReactiveInputComponent],
    templateUrl: './reactive.searchbar.component.html',
    styleUrls: ['./reactive.searchbar.component.scss'],
})
export class ReactiveSearchbarComponent extends BaseFormReactiveComponent {
    search = input<string>('');
    callbackSearch = output<string>();

    constructor() {
        super();
        effect(() => {
            this.form = this.formBuilder.group({
                search: [this.search()],
            });
        });
    }

    onSend(value: string) {
        this.callbackSearch.emit(value);
    }
}
