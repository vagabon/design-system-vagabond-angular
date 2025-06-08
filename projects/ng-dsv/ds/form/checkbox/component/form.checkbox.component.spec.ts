import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { FormCheckboxComponent } from './form.checkbox.component';

describe('FormCheckboxComponent', () => {
    let component: FormCheckboxComponent;
    let fixture: ComponentFixture<FormCheckboxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormCheckboxComponent],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(FormCheckboxComponent);
        component = fixture.componentInstance;

        const formGroup = new FormGroup({
            myCheckbox: new FormControl(false)
        });

        component.form = signal(formGroup) as unknown as InputSignal<FormGroup>;
        component.field = signal('myCheckbox') as unknown as InputSignal<string>;
        component.withLabel = signal(true) as unknown as InputSignal<boolean>;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit value on change', () => {
        const spy = jasmine.createSpy('changeSpy');
        component.change.subscribe(spy);

        component.form().get(component.field())?.setValue(true);

        component.doChange();

        expect(spy).toHaveBeenCalledWith(true);
    });
});
