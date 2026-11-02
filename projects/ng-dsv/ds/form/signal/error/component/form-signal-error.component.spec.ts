import { InputSignal, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationError } from '@angular/forms/signals';
import { provideTranslateService } from '@ngx-translate/core';
import { FormSignalErrorComponent } from './form-signal-error.component';

describe('FormSignalErrorComponent', () => {
    let fixture: ComponentFixture<FormSignalErrorComponent>;
    let component: FormSignalErrorComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormSignalErrorComponent],
            providers: [provideTranslateService()],
        }).compileComponents();

        fixture = TestBed.createComponent(FormSignalErrorComponent);
        component = fixture.componentInstance;
        component.isTouched = signal(true) as unknown as InputSignal<boolean>;
    });

    function initError<T>(value: T[]) {
        component.errors = signal(value) as unknown as InputSignal<ValidationError[]>;
    }
    const ERROR_CASES = [
        {
            label: 'required error message',
            errors: [{ kind: 'required' }],
            expected: 'Le champ est obligatoire.',
        },
        {
            label: 'minLength error message with correct value',
            errors: [{ kind: 'minLength', minLength: 5 }],
            expected: 'La taille minimum est de 5.',
        },
        {
            label: 'maxLength error message with correct value',
            errors: [{ kind: 'maxLength', maxLength: 10 }],
            expected: 'La taille maximum est de 10.',
        },
        {
            label: 'email error message',
            errors: [{ kind: 'email' }],
            expected: "Le format n'est pas celui d'un email.",
        },
        {
            label: 'custom error message if provided',
            errors: [{ kind: 'custom', message: 'Erreur personnalisée' }],
            expected: 'Erreur personnalisée',
        },
        {
            label: 'unknown error message if no message provided',
            errors: [{ kind: 'unknown' }],
            expected: 'Erreur inconnue.',
        },
    ];

    it.each(ERROR_CASES)('should display $label', ({ errors, expected }) => {
        initError(errors);
        fixture.detectChanges();
        const errorDiv = fixture.nativeElement.querySelector('div');
        expect(errorDiv?.textContent).toContain(expected);
    });
});
