import { EnvironmentInjector, runInInjectionContext, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldTree, form } from '@angular/forms/signals';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { DsvFormSignalSelectComponent } from './form-signal-select.component';

interface TestDto {
    role: string;
}

describe('DsvFormSignalSelectComponent', () => {
    let component: DsvFormSignalSelectComponent<TestDto>;
    let fixture: ComponentFixture<DsvFormSignalSelectComponent<TestDto>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvFormSignalSelectComponent],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvFormSignalSelectComponent<TestDto>);
        component = fixture.componentInstance;

        const mockList: (ApiDto & { name: string })[] = [
            { id: 1, name: 'User' },
            { id: 2, name: 'Admin' },
        ];

        runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
            const formSignal = form(signal({ role: 'User' } as TestDto)) as unknown as FieldTree<
                TestDto,
                string | number
            >;

            fixture.componentRef.setInput('form', formSignal);
            fixture.componentRef.setInput('fieldName', 'role');
            fixture.componentRef.setInput('withLabel', true);
            fixture.componentRef.setInput('list', mockList);
        });

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
