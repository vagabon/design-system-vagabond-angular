import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinearProgressComponent } from './linear-progress.component';

@Component({
  template: `<app-linear-progress
    [load]="load"
    [value]="value"
    [indeterminate]="indeterminate"
  ></app-linear-progress>`,
  imports: [LinearProgressComponent],
})
class TestHostComponent {
  load = true;
  value = 50;
  indeterminate = false;
}

describe('LinearProgressComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    const linearProgressEl = fixture.nativeElement.querySelector(
      'app-linear-progress',
    );
    expect(linearProgressEl).toBeTruthy();
  });

  it('should receive @Input load correctly', () => {
    const componentInstance = fixture.debugElement.children[0]
      .componentInstance as LinearProgressComponent;
    expect(componentInstance.load()).toBeTrue();
  });

  it('should receive @Input value correctly', () => {
    const componentInstance = fixture.debugElement.children[0]
      .componentInstance as LinearProgressComponent;
    expect(componentInstance.value()).toBe(50);
  });

  it('should receive @Input indeterminate correctly', () => {
    const componentInstance = fixture.debugElement.children[0]
      .componentInstance as LinearProgressComponent;
    expect(componentInstance.indeterminate()).toBeFalse();
  });
});
