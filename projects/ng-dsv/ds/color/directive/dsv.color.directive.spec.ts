import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DsvColorDirective } from './dsv.color.directive';

@Component({
  template: `<div [colorClass]="color"></div>`,
  standalone: true,
  imports: [DsvColorDirective],
})
class TestComponent {
  color = 'primary';
}

describe('DsvColorDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let divEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    divEl = fixture.debugElement.query(By.css('div'));
  });

  it('should create an instance', () => {
    const directive = divEl.injector.get(DsvColorDirective);
    fixture.detectChanges();
    expect(directive).toBeTruthy();
  });

  it('should add default "primary" class if no input is provided', () => {
    fixture.detectChanges();
    const element = divEl.nativeElement;
    expect(element.classList).toContain('primary');
  });

  it('should add the correct class based on input', () => {
    component.color = 'success';
    fixture.detectChanges();
    const element = divEl.nativeElement;
    expect(element.classList).toContain('success');
    expect(element.classList).not.toContain('primary');
  });

  it('should remove previous class when input changes', () => {
    component.color = 'warning';
    fixture.detectChanges();
    const element = divEl.nativeElement;
    expect(element.classList).toContain('warning');
  });

  it('should remove previous class when input changes 2', () => {
    component.color = 'error';
    fixture.detectChanges();
    const element = divEl.nativeElement;
    expect(element.classList).toContain('error');
    expect(element.classList).not.toContain('warning');
  });

  it('should handle empty string input by falling back to "primary"', () => {
    component.color = '';
    fixture.detectChanges();
    const element = divEl.nativeElement;
    expect(element.classList).toContain('primary');
  });

  it('should handle null/undefined input by falling back to "primary"', () => {
    component.color = null as any;
    fixture.detectChanges();
    const element = divEl.nativeElement;
    expect(element.classList).toContain('primary');
  });

  it('should not add any extra classes', () => {
    component.color = 'info';
    fixture.detectChanges();
    const element = divEl.nativeElement;
    expect(element.classList.length).toBe(1);
    expect(element.classList).toContain('info');
  });
});
