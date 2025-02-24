import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DsvAvatarComponent } from './avatar.component';

describe('ChatbotModelComponent', () => {
  let component: DsvAvatarComponent;
  let fixture: ComponentFixture<DsvAvatarComponent>;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => {} } } };
    await TestBed.configureTestingModule({
      imports: [DsvAvatarComponent],
      providers: [],
    }).compileComponents();
    fixture = TestBed.createComponent(DsvAvatarComponent);
    component = fixture.componentInstance;
  });

  it('should render new model', () => {
    const mockCallback = jasmine.createSpy('callback');
    component.callback = mockCallback;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.open'))).toBeFalsy();

    const link =
      fixture.debugElement.nativeElement.querySelector('.dsv-avatar');
    link.click();
    fixture.detectChanges();
    expect(mockCallback).toHaveBeenCalled();
  });
});
