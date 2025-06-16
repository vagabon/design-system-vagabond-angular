import {
  OutputEmitterRef,
  provideZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvAvatarComponent } from './avatar.component';

describe('DsvAvatarComponent', () => {
  let component: DsvAvatarComponent;
  let fixture: ComponentFixture<DsvAvatarComponent>;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => {} } } };
    await TestBed.configureTestingModule({
      imports: [DsvAvatarComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(DsvAvatarComponent);
    component = fixture.componentInstance;
  });

  it('should not emit callback if no listener exists', () => {
    const callback = jasmine.createSpy();
    component.callback = {
      listeners: [{ id: 1 }],
      emit: () => callback,
    } as unknown as OutputEmitterRef<void>;
    fixture.detectChanges();

    fixture.nativeElement.click();
    expect(callback).not.toHaveBeenCalled();
  });
});
