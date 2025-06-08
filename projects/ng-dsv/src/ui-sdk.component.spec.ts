import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { UiSdkComponent } from './ui-sdk.component';

describe('UiSdkComponent', () => {
  let component: UiSdkComponent;
  let fixture: ComponentFixture<UiSdkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSdkComponent],
      providers: [
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
