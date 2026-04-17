import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationError } from '@angular/forms/signals';
import { provideTranslateService } from '@ngx-translate/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { FormSignalErrorComponent } from './form.signal.error.component';

describe('FormSignalErrorComponent', () => {
    let fixture: ComponentFixture<FormSignalErrorComponent>;
    let component: FormSignalErrorComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormSignalErrorComponent],
            providers: [provideZonelessChangeDetection(), provideTranslateService()],
        }).compileComponents();

        fixture = TestBed.createComponent(FormSignalErrorComponent);
        component = fixture.componentInstance;
        component.isTouched = signal(true) as unknown as InputSignal<boolean>;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have correct host classes', () => {
        expect(component.hostClasses).toBe('text error');
    });

    it('should not display error if errors input is empty', () => {
        component.errors = signal([]) as unknown as InputSignal<ValidationError[]>;
        fixture.detectChanges();
        const errorDiv = fixture.nativeElement.querySelector('div');
        expect(errorDiv).toBeNull();
    });

    it('should display required error message', () => {
        component.errors = signal([{ kind: 'required' }]) as unknown as InputSignal<ValidationError[]>;
        fixture.detectChanges();
        const errorDiv = fixture.nativeElement.querySelector('div');
        expect(errorDiv?.textContent).toContain('Le champ est obligatoire.');
    });

    it('should display minLength error message with correct value', () => {
        component.errors = signal([{ kind: 'minLength', minLength: 5 }]) as unknown as InputSignal<
            ValidationError[]
        >;
        fixture.detectChanges();
        const errorDiv = fixture.nativeElement.querySelector('div');
        expect(errorDiv?.textContent).toContain('La taille minimum est de 5.');
    });

    it('should display maxLength error message with correct value', () => {
        component.errors = signal([{ kind: 'maxLength', maxLength: 10 }]) as unknown as InputSignal<
            ValidationError[]
        >;
        fixture.detectChanges();
        const errorDiv = fixture.nativeElement.querySelector('div');
        expect(errorDiv?.textContent).toContain('La taille maximum est de 10.');
    });

    it('should display email error message', () => {
        component.errors = signal([{ kind: 'email' }]) as unknown as InputSignal<ValidationError[]>;
        fixture.detectChanges();
        const errorDiv = fixture.nativeElement.querySelector('div');
        expect(errorDiv?.textContent).toContain("Le format n'est pas celui d'un email.");
    });

    it('should display custom error message if provided', () => {
        component.errors = signal([
            { kind: 'custom', message: 'Erreur personnalisée' },
        ]) as unknown as InputSignal<ValidationError[]>;
        fixture.detectChanges();
        const errorDiv = fixture.nativeElement.querySelector('div');
        expect(errorDiv?.textContent).toContain('Erreur personnalisée');
    });

    it('should display unknown error message if no message provided', () => {
        component.errors = signal([{ kind: 'unknown' }]) as unknown as InputSignal<ValidationError[]>;
        fixture.detectChanges();
        const errorDiv = fixture.nativeElement.querySelector('div');
        expect(errorDiv?.textContent).toContain('Erreur inconnue.');
    });

    it('should display first error message if multiple errors', () => {
        component.errors = signal([
            { kind: 'required' },
            { kind: 'minLength', minLength: 3 },
        ]) as unknown as InputSignal<ValidationError[]>;

        fixture.detectChanges();
        const errorDiv = fixture.nativeElement.querySelector('div');
        expect(errorDiv?.textContent).toContain('La taille minimum est de 3.');
    });

    it('should update error message when errors input changes', () => {
        component.errors = signal([{ kind: 'required' }]) as unknown as InputSignal<ValidationError[]>;
        fixture.detectChanges();
        const errorDiv = fixture.nativeElement.querySelector('div');
        expect(errorDiv?.textContent).toContain('Le champ est obligatoire.');
    });

    it('should update error message when errors input changes email', () => {
        component.errors = signal([{ kind: 'email' }]) as unknown as InputSignal<ValidationError[]>;
        fixture.detectChanges();
        const errorDiv = fixture.nativeElement.querySelector('div');
        expect(errorDiv?.textContent).toContain("Le format n'est pas celui d'un email.");
    });

    it('should not display error if error signal is empty', () => {
        component.errors = signal([{ kind: 'required', message: '' }]) as unknown as InputSignal<
            ValidationError[]
        >;
        component.error.set('');
        fixture.detectChanges();
        const errorDiv = fixture.nativeElement.querySelector('div');
        expect(errorDiv).not.toBeNull();
    });
});
