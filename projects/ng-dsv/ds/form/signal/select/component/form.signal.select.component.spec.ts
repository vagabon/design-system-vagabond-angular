import { EnvironmentInjector, InputSignal, provideZonelessChangeDetection, runInInjectionContext, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldTree, form } from '@angular/forms/signals';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { FormSignalSelectComponent } from './form.signal.select.component';

interface TestDto {
    role: string;
}

describe('SelectComponent', () => {
    let component: FormSignalSelectComponent<TestDto>;
    let fixture: ComponentFixture<FormSignalSelectComponent<TestDto>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormSignalSelectComponent],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(FormSignalSelectComponent<TestDto>);
        component = fixture.componentInstance;

        const mockList: (ApiDto & { name: string })[] = [
            { id: 1, name: 'User' },
            { id: 2, name: 'Admin' }
        ];

        runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
            const formSignal = form(signal({ role: 'User' } as TestDto)) as unknown as FieldTree<TestDto, string | number>;
            component.form = signal(formSignal) as unknown as InputSignal<FieldTree<TestDto, string | number>>;
            component.fieldName = signal('title') as unknown as InputSignal<string>;
            component.withLabel = signal(true) as unknown as InputSignal<boolean>;
            component.list = signal(mockList) as unknown as InputSignal<(ApiDto & { name: string })[]>;
        });

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
