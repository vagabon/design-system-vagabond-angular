import { Component, input } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { FormSignalErrorComponent } from '../../error/component/form-signal-error.component';
import { DsvFormSignalLabelComponent } from '../../label/component/form-signal-label.component';
import { DsvBaseFormSignalInputComponent } from '../../public-api';

@Component({
    selector: 'dsv-form-signal-select',
    imports: [FormField, DsvFormSignalLabelComponent, FormSignalErrorComponent],
    templateUrl: './form-signal-select.component.html',
    styleUrls: [
        '../../../reactive/input/component/form-reactive-input.component.scss',
        '../../../reactive/select/component/form-reactive-select.component.scss',
    ],
})
export class DsvFormSignalSelectComponent<T> extends DsvBaseFormSignalInputComponent<T> {
    readonly multiple = input<boolean>(false);
    readonly list = input<(ApiDto & { name: string })[]>([]);
}
