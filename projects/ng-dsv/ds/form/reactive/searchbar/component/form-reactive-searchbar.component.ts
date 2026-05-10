import { Component, effect, input, output } from '@angular/core';
import {
    DsvBaseFormReactiveComponent,
    DsvFormReactiveComponent,
    DsvFormReactiveInputComponent,
} from '../../public-api';

@Component({
    selector: 'dsv-form-reactive-searchbar',
    imports: [DsvFormReactiveComponent, DsvFormReactiveInputComponent],
    templateUrl: './form-reactive-searchbar.component.html',
    styleUrls: ['./form-reactive-searchbar.component.scss'],
})
export class DsvFormReactiveSearchbarComponent extends DsvBaseFormReactiveComponent {
    readonly search = input<string>('');
    readonly callbackSearch = output<string>();

    constructor() {
        super();
        effect(() => {
            this.form = this.formBuilder.group({
                search: [this.search()],
            });
        });
    }

    onSend(value: string): void {
        this.callbackSearch.emit(value);
    }
}
