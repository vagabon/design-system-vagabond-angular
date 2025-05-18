import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvButtonComponent } from './button.component';

describe('DsvButtonComponent', () => {
  let component: DsvButtonComponent;
  let fixture: ComponentFixture<DsvButtonComponent>;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => {} } } };
    await TestBed.configureTestingModule({
      imports: [DsvButtonComponent],
      providers: [],
    }).compileComponents();
    fixture = TestBed.createComponent(DsvButtonComponent);
    component = fixture.componentInstance;
  });

  it('should render', () => {
    const mockCallback = jasmine.createSpyObj('callback', ['emit']);
    component.callback = mockCallback;
    fixture.detectChanges();
    expect(component).toBeTruthy();

    const link =
      fixture.debugElement.nativeElement.querySelector('.dsv-button');
    link.click();
    fixture.detectChanges();
    expect(component.callback.emit).toHaveBeenCalled();
  });
});
