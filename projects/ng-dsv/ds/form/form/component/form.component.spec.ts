import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideTranslateService } from '@ngx-translate/core';
import { FormComponent } from './form.component';

@Component({
  template: `
    <app-form [form]="form">
      <button type="submit">Submit</button>
    </app-form>
  `,
  imports: [FormComponent, ReactiveFormsModule],
})
class TestHostComponent {
  form = new FormBuilder().group({
    name: ['', Validators.required],
  });
}
describe('FormComponent with submit button in projection', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection(), provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should submit the form when valid', () => {
    const formDebug = fixture.debugElement;
    const form = host.form;
    spyOn(console, 'log');

    form.get('name')?.setValue('John Doe');
    fixture.detectChanges();

    const button = formDebug.query(By.css('button[type="submit"]'));
    button.nativeElement.click();

    expect(form.valid).toBeTrue();
  });
});
