import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { DsvFormReactiveErrorComponent } from '../../error/component/form-reactive-error.component';
import { DsvFormReactiveLabelComponent } from '../../label/component/form-reactive-label.component';

@Component({
    selector: 'dsv-form-reactive-select',
    imports: [ReactiveFormsModule, DsvFormReactiveLabelComponent, DsvFormReactiveErrorComponent],
    templateUrl: './form-reactive-select.component.html',
    styleUrls: [
        '../../input/component/form-reactive-input.component.scss',
        './form-reactive-select.component.scss',
    ],
})
export class FormReactiveSelectComponent {
    readonly form = input.required<FormGroup>();
    readonly field = input.required<string>();
    readonly withLabel = input<boolean>(true);

    readonly list = input<(ApiDto & { name: string })[]>([]);

    readonly callbackChange = output<string>();

    doChange(): void {
        this.callbackChange.emit(this.form().value[this.field()]);
    }
}
