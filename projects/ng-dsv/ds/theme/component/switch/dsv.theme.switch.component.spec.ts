import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeService } from '../../public-api';
import { DsvThemeSwitchComponent } from './dsv.theme.switch.component';

describe('ChatbotModelComponent', () => {
  let component: DsvThemeSwitchComponent;
  let fixture: ComponentFixture<DsvThemeSwitchComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => {} } } };
    await TestBed.configureTestingModule({
      imports: [DsvThemeSwitchComponent],
      providers: [],
    }).compileComponents();
    themeService = TestBed.inject(ThemeService);
    fixture = TestBed.createComponent(DsvThemeSwitchComponent);
    component = fixture.componentInstance;
  });

  it('should render new model', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

    const switchThemeSpy = spyOn(themeService, 'switchTheme');
    fixture.debugElement.nativeElement.querySelector('.dsv-button').click();
    expect(switchThemeSpy).toHaveBeenCalled();
  });
});
