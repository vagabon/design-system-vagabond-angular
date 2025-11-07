import { provideHttpClient } from '@angular/common/http';
import { EnvironmentInjector, InputSignal, provideZonelessChangeDetection, runInInjectionContext, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldTree, form } from '@angular/forms/signals';
import { FormSignalInputComponent } from './form.signal.input.component';

interface TestDto {
  title: string;
}

describe('FormSignalInputComponent', () => {
  let component: FormSignalInputComponent<TestDto>;
  let fixture: ComponentFixture<FormSignalInputComponent<TestDto>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSignalInputComponent, ReactiveFormsModule],
      providers: [
        provideZonelessChangeDetection(), provideHttpClient()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormSignalInputComponent<TestDto>);
    component = fixture.componentInstance;

    runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
      const formSignal = form(signal({ title: 'test value' } as TestDto)) as unknown as FieldTree<TestDto, string | number>;
      component.form = signal(formSignal) as unknown as InputSignal<FieldTree<TestDto, string | number>>;
      component.fieldName = signal('title') as unknown as InputSignal<string>;
    });


    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value on Enter', () => {
    spyOn(component.onSend, 'emit');

    component.doOnSend();

    expect(component.onSend.emit).toHaveBeenCalledWith('test value');
  });
});
