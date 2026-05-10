import { Component, input } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { INPUT_TYPE } from '@ng-vagabond-lab/ng-dsv/type';
import { FormSignalErrorComponent } from '../../error/component/form-signal-error.component';
import { DsvBaseFormSignalInputComponent } from '../../form/base/input/base-form-signal-input.component';
import { DsvFormSignalLabelComponent } from '../../label/component/form-signal-label.component';

@Component({
    selector: 'dsv-form-signal-input',
    imports: [FormField, DsvFormSignalLabelComponent, FormSignalErrorComponent],
    templateUrl: './form-signal-input.component.html',
    styleUrl: '../../../reactive/input/component/form-reactive-input.component.scss',
})
export class DsvFormSignalInputComponent<T> extends DsvBaseFormSignalInputComponent<T> {
    readonly type = input<INPUT_TYPE>('text');
    readonly icon = input<string>();
}
