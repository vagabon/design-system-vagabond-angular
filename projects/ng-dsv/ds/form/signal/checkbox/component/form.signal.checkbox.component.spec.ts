import {
    EnvironmentInjector,
    InputSignal,
    provideZonelessChangeDetection,
    runInInjectionContext,
    signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldTree, form } from '@angular/forms/signals';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FormSignalCheckboxComponent } from './form.signal.checkbox.component';

interface TestDto {
    myCheckbox: boolean;
}

describe('FormSignalCheckboxComponent', () => {
    let component: FormSignalCheckboxComponent<TestDto>;
    let fixture: ComponentFixture<FormSignalCheckboxComponent<TestDto>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormSignalCheckboxComponent],
            providers: [provideZonelessChangeDetection()],
        }).compileComponents();

        fixture = TestBed.createComponent(FormSignalCheckboxComponent<TestDto>);
        component = fixture.componentInstance;

        const formGroup = new FormGroup({
            myCheckbox: new FormControl(false),
        });

        runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
            const formSignal = form(signal({ myCheckbox: true } as TestDto)) as unknown as FieldTree<
                TestDto,
                string | number
            >;
            component.form = signal(formSignal) as unknown as InputSignal<
                FieldTree<TestDto, string | number>
            >;
            component.fieldName = signal('myCheckbox') as unknown as InputSignal<string>;
            component.withLabel = signal(true) as unknown as InputSignal<boolean>;
        });

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit value on change', () => {
        const spy = vi.fn();
        component.callbackChange.subscribe(spy);

        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
        vi.spyOn(component, 'doChange');
        checkbox.click();
        fixture.detectChanges();

        expect(component.doChange).toHaveBeenCalled();
    });
});
