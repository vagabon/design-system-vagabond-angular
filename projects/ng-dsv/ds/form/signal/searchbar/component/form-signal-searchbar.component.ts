import { Component, effect, input, output, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { DsvBaseFormSignalComponent } from '../../form/base/base-form-signal.component';
import { DsvFormSignalComponent, DsvFormSignalInputComponent } from '../../public-api';

@Component({
    selector: 'dsv-form-signal-searchbar',
    imports: [DsvFormSignalComponent, DsvFormSignalInputComponent],
    templateUrl: './form-signal-searchbar.component.html',
    styleUrls: ['../../../reactive/searchbar/component/form-reactive-searchbar.component.scss'],
})
export class DsvFormSignalSearchbarComponent extends DsvBaseFormSignalComponent {
    readonly search = input<string>('');
    readonly callbackSearch = output<string>();

    readonly form = form(signal({ search: this.search() }));

    constructor() {
        super();
        effect(() => {
            this.form().reset({ search: this.search() });
        });
    }

    onSend(value: string): void {
        this.callbackSearch.emit(value);
    }
}
