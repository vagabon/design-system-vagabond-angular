import { provideHttpClient } from '@angular/common/http';
import { EnvironmentInjector, runInInjectionContext, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldTree, form } from '@angular/forms/signals';
import { DsvFormSignalInputComponent } from './form-signal-input.component';

interface TestDto {
    title: string;
}

describe('DsvFormSignalInputComponent', () => {
    let component: DsvFormSignalInputComponent<TestDto>;
    let fixture: ComponentFixture<DsvFormSignalInputComponent<TestDto>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvFormSignalInputComponent, ReactiveFormsModule],
            providers: [provideHttpClient()],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvFormSignalInputComponent<TestDto>);
        component = fixture.componentInstance;

        runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
            const formSignal = form(signal({ title: 'test value' } as TestDto)) as unknown as FieldTree<
                TestDto,
                string | number
            >;

            fixture.componentRef.setInput('form', formSignal);
            fixture.componentRef.setInput('fieldName', 'title');
        });

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should emit value on Enter', () => {
        vi.spyOn(component.callbackSend, 'emit');

        component.doOnSend();

        expect(component.callbackSend.emit).toHaveBeenCalledWith('test value');
    });
});
