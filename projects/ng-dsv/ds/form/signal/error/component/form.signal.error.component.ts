import { Component, effect, HostBinding, input, signal } from "@angular/core";
import { ValidationError } from "@angular/forms/signals";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'dsv-signal-form-error',
    imports: [TranslatePipe],
    templateUrl: './form.signal.error.component.html',
    styleUrls: ['../../../reactive/error/component/form.reactive.error.component.scss']
})
export class FormSignalErrorComponent {
    errors = input.required<ValidationError[]>();

    error = signal<string>('');

    @HostBinding('class')
    get hostClasses(): string {
        const classes: string[] = ['text', 'error'];
        return classes.join(' ');
    }

    constructor() {
        effect(() => {
            let errorMessage = "";
            this.errors().forEach(error => {
                switch (error.kind) {
                    case "required":
                        errorMessage = "Le champ est obligatoire.";
                        break;
                    case "minLength":
                        errorMessage = "La taille minimum est de " + error['minLength' as keyof ValidationError] + ".";
                        break;
                    case "maxLength":
                        errorMessage = "La taille maximum est de " + error['maxLength' as keyof ValidationError] + ".";
                        break;
                    case "email":
                        errorMessage = "Le format n'est pas celui d'un email.";
                        break;
                    default:
                        errorMessage = error.message ?? "Erreur inconnue.";
                        break;
                }
            });
            this.error.set(errorMessage);
        })
    }
}