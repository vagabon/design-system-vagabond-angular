import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { FileShowComponent } from './file.show.component';

describe('FileShowComponent', () => {
  let component: FileShowComponent;
  let fixture: ComponentFixture<FileShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileShowComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(FileShowComponent);
    component = fixture.componentInstance;
    component.src = signal('') as any;
    fixture.detectChanges();

  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default alt text', () => {
    expect(component.alt()).toBe('Exemple du dsv file show');
  });
});