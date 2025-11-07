import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { form } from '@angular/forms/signals';
import { provideTranslateService } from '@ngx-translate/core';
import { FormSignalComponent } from './form.signal.component';

@Component({
  template: `
    <app-form-signal>
      <button type="submit">Submit</button>
    </app-form-signal>
  `,
  imports: [FormSignalComponent],
})
class TestHostComponent {
  form = form(signal({ name: '' }));
}

describe('FormComponent with submit button in projection', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection(), provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
