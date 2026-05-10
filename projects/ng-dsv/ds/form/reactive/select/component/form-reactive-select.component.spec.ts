import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { FormReactiveSelectComponent } from './form-reactive-select.component';

describe('SelectComponent', () => {
    let component: FormReactiveSelectComponent;
    let fixture: ComponentFixture<FormReactiveSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormReactiveSelectComponent],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(FormReactiveSelectComponent);
        component = fixture.componentInstance;

        const form = new FormGroup({
            role: new FormControl('USER'),
        });

        const mockList: (ApiDto & { name: string })[] = [
            { id: 1, name: 'User' },
            { id: 2, name: 'Admin' },
        ];

        fixture.componentRef.setInput('form', form);
        fixture.componentRef.setInput('field', 'role');
        fixture.componentRef.setInput('withLabel', true);
        fixture.componentRef.setInput('list', mockList);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit selected value on change', () => {
        const changeSpy = vi.fn();
        component.callbackChange.subscribe(changeSpy);

        component.form().get(component.field())?.setValue('Admin');
        component.doChange();

        expect(changeSpy).toHaveBeenCalledWith('Admin');
    });
});
