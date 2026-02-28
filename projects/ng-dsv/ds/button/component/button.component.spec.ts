import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DsvButtonComponent } from './button.component';

describe('DsvButtonComponent', () => {
  let component: DsvButtonComponent;
  let fixture: ComponentFixture<DsvButtonComponent>;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => { } } } };
    await TestBed.configureTestingModule({
      imports: [DsvButtonComponent],
      providers: [
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DsvButtonComponent);
    component = fixture.componentInstance;
  });

  it('should render', () => {
    const mockCallback = { emit: vi.fn() };
    component.callback = mockCallback as any;
    fixture.detectChanges();
    expect(component).toBeTruthy();

    const link = fixture.debugElement.nativeElement.querySelector('.dsv-button');
    link.click();
    fixture.detectChanges();
    expect(component.callback.emit).toHaveBeenCalled();
  });
});