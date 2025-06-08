import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DsvAvatarComponent } from './avatar.component';

describe('DsvAvatarComponent', () => {
  let component: DsvAvatarComponent;
  let fixture: ComponentFixture<DsvAvatarComponent>;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => { } } } };
    await TestBed.configureTestingModule({
      imports: [DsvAvatarComponent],
      providers: [
        provideZonelessChangeDetection(),],
    }).compileComponents();
    fixture = TestBed.createComponent(DsvAvatarComponent);
    component = fixture.componentInstance;
  });

  it('should render', () => {
    spyOn(component.callback, 'emit');
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.open'))).toBeFalsy();

    const link =
      fixture.debugElement.nativeElement.querySelector('.dsv-avatar');
    link.click();
    fixture.detectChanges();
    expect(component.callback.emit).toHaveBeenCalled();
  });
});
