import { Component, effect, input, output, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { BaseFormSignalComponent } from '../../form/base/base.form.signal.component';
import { FormSignalComponent, FormSignalInputComponent } from '../../public-api';

@Component({
    selector: 'dsv-form-signal-searchbar',
    imports: [FormSignalComponent, FormSignalInputComponent],
    templateUrl: './form.signal.searchbar.component.html',
    styleUrls: ['../../../reactive/searchbar/component/reactive.searchbar.component.scss'],
})
export class FormSignalSearchbarComponent extends BaseFormSignalComponent {
    search = input<string>('');
    callbackSearch = output<string>();

    form = form(signal({ search: this.search() }));

    constructor() {
        super();
        effect(() => {
            this.form().reset({ search: this.search() });
        });
    }

    onSend(value: string) {
        this.callbackSearch.emit(value);
    }
}
