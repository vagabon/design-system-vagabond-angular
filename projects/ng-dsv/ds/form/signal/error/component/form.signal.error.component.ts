import { Component, HostBinding, input } from "@angular/core";
import { ValidationErrorWithField } from "@angular/forms/signals";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'dsv-signal-form-error',
    imports: [TranslatePipe],
    templateUrl: './form.signal.error.component.html',
    styleUrls: ['../../../legacy/error/component/form.error.component.scss']
})
export class FormSignalErrorComponent {
    errors = input.required<ValidationErrorWithField[]>();

    @HostBinding('class')
    get hostClasses(): string {
        const classes: string[] = ['text', 'error'];
        return classes.join(' ');
    }

    isRequired() {
        return this.errors().some(error => error.kind === 'required');
    }
}