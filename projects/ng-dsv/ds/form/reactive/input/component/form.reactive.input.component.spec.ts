import { provideHttpClient } from '@angular/common/http';
import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormReactiveInputComponent } from './form.reactive.input.component';

describe('FormReactiveInputComponent', () => {
  let component: FormReactiveInputComponent;
  let fixture: ComponentFixture<FormReactiveInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormReactiveInputComponent, ReactiveFormsModule],
      providers: [
        provideZonelessChangeDetection(), provideHttpClient()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormReactiveInputComponent);
    component = fixture.componentInstance;

    const formGroup = new FormGroup({
      testField: new FormControl('', Validators.required)
    });

    component.form = signal(formGroup) as unknown as InputSignal<FormGroup>;
    component.field = signal('testField') as unknown as InputSignal<string>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value on Enter', () => {
    spyOn(component.onSend, 'emit');
    component.form().get('testField')?.setValue('test value');

    component.onEnter();

    expect(component.onSend.emit).toHaveBeenCalledWith('test value');
  });
});
