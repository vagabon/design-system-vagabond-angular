import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { FormSelectComponent } from './form.select.component';

describe('SelectComponent', () => {
    let component: FormSelectComponent;
    let fixture: ComponentFixture<FormSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormSelectComponent],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(FormSelectComponent);
        component = fixture.componentInstance;

        const form = new FormGroup({
            role: new FormControl('USER')
        });

        const mockList: (ApiDto & { name: string })[] = [
            { id: 1, name: 'User' },
            { id: 2, name: 'Admin' }
        ];

        component.form = signal(form) as unknown as InputSignal<FormGroup>;
        component.field = signal('role') as unknown as InputSignal<string>;
        component.withLabel = signal(true) as unknown as InputSignal<boolean>;
        component.list = signal(mockList) as unknown as InputSignal<(ApiDto & { name: string })[]>;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit selected value on change', () => {
        const changeSpy = jasmine.createSpy('changeSpy');
        component.change.subscribe(changeSpy);

        component.form().get(component.field())?.setValue('Admin');
        component.doChange();

        expect(changeSpy).toHaveBeenCalledWith('Admin');
    });
});
