import { provideHttpClient } from '@angular/common/http';
import { InputSignal, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { FormInputComponent } from './form.input.component';

describe('FormInputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputComponent],
      providers: [provideHttpClient()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(FormInputComponent);
    const app = fixture.componentInstance;
    app.form = signal(
      new FormGroup({
        test: new FormControl(''),
      })
    ) as unknown as InputSignal<FormGroup>;
    app.field = signal('test') as unknown as InputSignal<string>;
    app.withLabel = signal(true) as unknown as InputSignal<boolean>;
    fixture.autoDetectChanges();
    expect(app).toBeTruthy();
  });
});
