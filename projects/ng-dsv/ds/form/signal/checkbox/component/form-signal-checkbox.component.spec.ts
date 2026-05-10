import { EnvironmentInjector, runInInjectionContext, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldTree, form } from '@angular/forms/signals';
import { DsvFormSignalCheckboxComponent } from './form-signal-checkbox.component';

interface TestDto {
    myCheckbox: boolean;
}

describe('DsvFormSignalCheckboxComponent', () => {
    let component: DsvFormSignalCheckboxComponent<TestDto>;
    let fixture: ComponentFixture<DsvFormSignalCheckboxComponent<TestDto>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvFormSignalCheckboxComponent],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvFormSignalCheckboxComponent<TestDto>);
        component = fixture.componentInstance;

        const formGroup = new FormGroup({
            myCheckbox: new FormControl(false),
        });

        runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
            const formSignal = form(signal({ myCheckbox: true } as TestDto)) as unknown as FieldTree<
                TestDto,
                string | number
            >;

            fixture.componentRef.setInput('form', formSignal);
            fixture.componentRef.setInput('fieldName', 'myCheckbox');
            fixture.componentRef.setInput('withLabel', true);
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
