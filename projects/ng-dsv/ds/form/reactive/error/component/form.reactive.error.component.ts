import { Component, HostBinding, input } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'dsv-form-reactive-error',
    imports: [TranslatePipe],
    templateUrl: './form.reactive.error.component.html',
    styleUrls: ['./form.reactive.error.component.scss']
})
export class FormReactiveErrorComponent {
    field = input.required<AbstractControl<any, any>>();

    @HostBinding('class')
    get hostClasses(): string {
        const classes: string[] = ['text', 'error'];
        return classes.join(' ');
    }
}