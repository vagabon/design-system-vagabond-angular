import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DsvFormReactiveInputComponent } from './form-reactive-input.component';

describe('FormReactiveInputComponent', () => {
    let component: DsvFormReactiveInputComponent;
    let fixture: ComponentFixture<DsvFormReactiveInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvFormReactiveInputComponent, ReactiveFormsModule],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvFormReactiveInputComponent);
        component = fixture.componentInstance;

        const formGroup = new FormGroup({
            testField: new FormControl('', Validators.required),
        });

        fixture.componentRef.setInput('form', formGroup);
        fixture.componentRef.setInput('field', 'testField');

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should emit value on Enter', () => {
        vi.spyOn(component.callbackSend, 'emit');
        component.form().get('testField')?.setValue('test value');

        component.onEnter();

        expect(component.callbackSend.emit).toHaveBeenCalledWith('test value');
    });
});
