import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvMenuComponent } from './menu.component';

describe('ChatbotModelComponent', () => {
  let component: DsvMenuComponent;
  let fixture: ComponentFixture<DsvMenuComponent>;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => {} } } };
    await TestBed.configureTestingModule({
      imports: [DsvMenuComponent],
      providers: [],
    }).compileComponents();
    fixture = TestBed.createComponent(DsvMenuComponent);
    component = fixture.componentInstance;
  });

  it('should render new model', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
