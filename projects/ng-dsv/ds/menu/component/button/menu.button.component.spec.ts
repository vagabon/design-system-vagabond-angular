import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuService } from '../../public-api';
import { DsvMenuButtonComponent } from './menu.button.component';

describe('ChatbotModelComponent', () => {
  let component: DsvMenuButtonComponent;
  let fixture: ComponentFixture<DsvMenuButtonComponent>;
  let menuService: MenuService;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => {} } } };
    await TestBed.configureTestingModule({
      imports: [DsvMenuButtonComponent],
      providers: [],
    }).compileComponents();
    menuService = TestBed.inject(MenuService);
    fixture = TestBed.createComponent(DsvMenuButtonComponent);
    component = fixture.componentInstance;
  });

  it('should render new model', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

    const menuSpy = spyOn(menuService, 'toogleMenu');
    fixture.debugElement.nativeElement.querySelector('.dsv-button').click();
    expect(menuSpy).toHaveBeenCalled();
  });
});
