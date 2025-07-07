import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { DsvImgComponent } from './img.component';

describe('DsvImgComponent', () => {
  let component: DsvImgComponent;
  let fixture: ComponentFixture<DsvImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsvImgComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DsvImgComponent);
    component = fixture.componentInstance;

    component.src = signal('url') as unknown as InputSignal<string>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set load to true when doLoad is called', () => {
    component.doLoad();
    expect(component.load()).toBeTrue();
  });

  it('should set error to true when onImageError is called', () => {
    component.onImageError();
    expect(component.error()).toBeTrue();
  });
});
