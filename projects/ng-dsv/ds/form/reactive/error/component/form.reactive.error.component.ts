import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'dsv-form-reactive-error',
    imports: [TranslatePipe],
    templateUrl: './form.reactive.error.component.html',
    styleUrls: ['./form.reactive.error.component.scss'],
    host: {
        class: 'text error',
    },
})
export class FormReactiveErrorComponent {
    field = input.required<AbstractControl<any, any>>();
}
