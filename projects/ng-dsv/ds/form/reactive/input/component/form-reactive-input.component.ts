import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { INPUT_TYPE } from '@ng-vagabond-lab/ng-dsv/type';
import { DsvFormReactiveErrorComponent } from '../../error/component/form-reactive-error.component';
import { DsvFormReactiveLabelComponent } from '../../label/component/form-reactive-label.component';

@Component({
    selector: 'dsv-form-reactive-input',
    imports: [ReactiveFormsModule, DsvFormReactiveLabelComponent, DsvFormReactiveErrorComponent],
    templateUrl: './form-reactive-input.component.html',
    styleUrl: './form-reactive-input.component.scss',
})
export class DsvFormReactiveInputComponent {
    readonly form = input.required<FormGroup>();
    readonly field = input.required<string>();
    readonly type = input<INPUT_TYPE>('text');
    readonly withLabel = input<boolean>(true);
    readonly required = input<boolean>(false);
    readonly icon = input<string>();

    readonly callbackSend = output<string>();

    checkClear(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.value === '') {
            this.onEnter();
        }
    }

    onEnter(): void {
        this.callbackSend.emit(this.form().value[this.field()]);
    }
}
