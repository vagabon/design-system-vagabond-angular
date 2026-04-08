import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { provideTranslateService, TranslatePipe } from '@ngx-translate/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FormSignalComponent } from './form.signal.component';

// ─── Mocks ────────────────────────────────────────────────────────────────────

vi.mock('@ng-vagabond-lab/ng-dsv/base', () => ({
  isCallback: vi.fn(),
}));

vi.mock('@angular/forms/signals', () => ({
  submit: vi.fn(),
}));

import { submit } from '@angular/forms/signals';

const mockToastService = { showToast: vi.fn() };

const makeForm = (valid: boolean, value: unknown = {}) => ({
  valid: vi.fn().mockReturnValue(valid),
  value: vi.fn().mockReturnValue(value),
});

const makeFieldTree = (valid: boolean, value: unknown = {}) => {
  const form = makeForm(valid, value);
  return vi.fn().mockReturnValue(form);
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('FormSignalComponent', () => {
  let fixture: ComponentFixture<FormSignalComponent<unknown>>;
  let component: FormSignalComponent<unknown>;
  let componentRef: ComponentRef<FormSignalComponent<unknown>>;

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [
        FormSignalComponent,
        DsvButtonComponent,
        TranslatePipe,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTranslateService(),
        provideRouter([]),
        { provide: ToastService, useValue: mockToastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormSignalComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('form', makeFieldTree(true));
    componentRef.setInput('formValid', 'Formulaire envoyé !');
    fixture.detectChanges();
  });

  // ── Inputs / defaults ───────────────────────────────────────────────────────

  describe('inputs', () => {
    it('should have default textValid = "ENREGISTRER"', () => {
      expect(component.textValid()).toBe('ENREGISTRER');
    });

    it('should have default formValid = "Formulaire envoyé !"', () => {
      expect(component.formValid()).toBe('Formulaire envoyé !');
    });

    it('should accept a custom textValid', () => {
      componentRef.setInput('textValid', 'VALIDER');
      fixture.detectChanges();
      expect(component.textValid()).toBe('VALIDER');
    });

    it('should accept a custom formValid', () => {
      componentRef.setInput('formValid', 'Succès !');
      fixture.detectChanges();
      expect(component.formValid()).toBe('Succès !');
    });

    it('should accept urlBack input', () => {
      componentRef.setInput('urlBack', '/retour');
      fixture.detectChanges();
      expect(component.urlBack()).toBe('/retour');
    });
  });

  // ── goBack ──────────────────────────────────────────────────────────────────

  describe('goBack()', () => {
    it('should emit callbackBack', () => {
      const spy = vi.spyOn(component.callbackBack, 'emit');
      component.goBack();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  // ── onSubmit ────────────────────────────────────────────────────────────────

  describe('onSubmit()', () => {
    it('should call event.preventDefault()', () => {
      const event = { preventDefault: vi.fn() } as unknown as Event;
      component.onSubmit(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should call submit() with the form signal', () => {
      const formSignal = makeFieldTree(true);
      componentRef.setInput('form', formSignal);
      fixture.detectChanges();

      const event = { preventDefault: vi.fn() } as unknown as Event;
      component.onSubmit(event);

      expect(submit).toHaveBeenCalledWith(formSignal, expect.any(Function));
    });

    describe('when form is valid', () => {
      it('should emit callback with form value', async () => {
        const formValue = { name: 'test' } as ApiDto;
        const form = makeForm(true, formValue);
        const formSignal = vi.fn().mockReturnValue(form);
        componentRef.setInput('form', formSignal);
        fixture.detectChanges();

        const spy = vi.spyOn(component.callback, 'emit');
        vi.mocked(submit).mockImplementation(async (_form, cb) => {
          (cb as (form: unknown) => void)(formSignal);
          return true;
        });

        const event = { preventDefault: vi.fn() } as unknown as Event;
        component.onSubmit(event);

        expect(spy).toHaveBeenCalledWith(formValue);
      });

      it('should show success toast with formValid text', async () => {
        const form = makeForm(true, {});
        const formSignal = vi.fn().mockReturnValue(form);
        componentRef.setInput('form', formSignal);
        componentRef.setInput('formValid', 'Envoyé avec succès !');
        fixture.detectChanges();

        vi.mocked(submit).mockImplementation(async (_form, cb) => {
          (cb as (form: unknown) => void)(formSignal);
          return true;
        });

        const event = { preventDefault: vi.fn() } as unknown as Event;
        component.onSubmit(event);

        expect(mockToastService.showToast).toHaveBeenCalledWith({
          text: 'Envoyé avec succès !',
        });
      });
    });

    describe('when form is invalid', () => {
      it('should show error toast', async () => {
        const form = makeForm(false);
        const formSignal = vi.fn().mockReturnValue(form);
        componentRef.setInput('form', formSignal);
        fixture.detectChanges();

        vi.mocked(submit).mockImplementation(async (_form, cb) => {
          (cb as (form: unknown) => void)(formSignal);
          return true;
        });

        const event = { preventDefault: vi.fn() } as unknown as Event;
        component.onSubmit(event);

        expect(mockToastService.showToast).toHaveBeenCalledWith({
          text: 'Erreur dans le formulaire !',
          type: 'error',
        });
      });

      it('should NOT emit callback when form is invalid', async () => {
        const form = makeForm(false);
        const formSignal = vi.fn().mockReturnValue(form);
        componentRef.setInput('form', formSignal);
        fixture.detectChanges();

        vi.mocked(submit).mockImplementation(async (_form, cb) => {
          (cb as (form: unknown) => void)(formSignal);
          return true;
        });

        const spy = vi.spyOn(component.callback, 'emit');
        const event = { preventDefault: vi.fn() } as unknown as Event;
        component.onSubmit(event);

        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});