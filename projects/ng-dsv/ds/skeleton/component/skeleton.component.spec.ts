import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { DsvSekeletonComponent } from './skeleton.component';
import { describe, beforeEach, it, expect } from 'vitest';

describe('DsvSekeletonComponent', () => {
  let component: DsvSekeletonComponent;
  let fixture: ComponentFixture<DsvSekeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsvSekeletonComponent],
      providers: [provideZonelessChangeDetection()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DsvSekeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
