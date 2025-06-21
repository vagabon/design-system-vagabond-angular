import { Component, HostBinding, input } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'dsv-form-error',
    imports: [TranslatePipe],
    templateUrl: './form.error.component.html',
    styleUrls: ['./form.error.component.scss']
})
export class FormErrorComponent {
    field = input.required<AbstractControl<any, any>>();

    @HostBinding('class')
    get hostClasses(): string {
        const classes: string[] = ['text', 'error'];
        return classes.join(' ');
    }
}