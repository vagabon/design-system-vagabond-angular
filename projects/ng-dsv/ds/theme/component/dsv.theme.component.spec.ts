import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvThemeComponent } from './dsv.theme.component';

describe('DsvThemeComponent', () => {
  let component: DsvThemeComponent;
  let fixture: ComponentFixture<DsvThemeComponent>;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => {} } } };
    await TestBed.configureTestingModule({
      imports: [DsvThemeComponent],
      providers: [],
    }).compileComponents();
    fixture = TestBed.createComponent(DsvThemeComponent);
    component = fixture.componentInstance;
  });

  it('should render', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
