import { provideHttpClient } from '@angular/common/http';
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
    app.form = new FormGroup({
      test: new FormControl(''),
    });
    app.field = 'test';
    app.withLabel = true;
    fixture.autoDetectChanges();
    expect(app).toBeTruthy();
  });
});
