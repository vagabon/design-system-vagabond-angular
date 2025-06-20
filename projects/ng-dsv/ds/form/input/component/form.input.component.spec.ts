import { provideHttpClient } from '@angular/common/http';
import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from './form.input.component';

describe('FormInputComponent', () => {
  let component: FormInputComponent;
  let fixture: ComponentFixture<FormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputComponent, ReactiveFormsModule],
      providers: [
        provideZonelessChangeDetection(), provideHttpClient()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormInputComponent);
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
