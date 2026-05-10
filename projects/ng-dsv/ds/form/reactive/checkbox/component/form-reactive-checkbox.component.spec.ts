import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { DsvFormReactiveCheckboxComponent } from './form-reactive-checkbox.component';

describe('FormReactiveCheckboxComponent', () => {
    let component: DsvFormReactiveCheckboxComponent;
    let fixture: ComponentFixture<DsvFormReactiveCheckboxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvFormReactiveCheckboxComponent],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvFormReactiveCheckboxComponent);
        component = fixture.componentInstance;

        const formGroup = new FormGroup({
            myCheckbox: new FormControl(false),
        });

        fixture.componentRef.setInput('form', formGroup);
        fixture.componentRef.setInput('field', 'myCheckbox');
        fixture.componentRef.setInput('withLabel', true);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit value on change', () => {
        const spy = vi.fn();
        component.callbackChange.subscribe(spy);

        component.form().get(component.field())?.setValue(true);

        component.doChange();

        expect(spy).toHaveBeenCalledWith(true);
    });
});
