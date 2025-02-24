import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvCardComponent } from './card.component';

describe('ChatbotModelComponent', () => {
  let component: DsvCardComponent;
  let fixture: ComponentFixture<DsvCardComponent>;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => {} } } };
    await TestBed.configureTestingModule({
      imports: [DsvCardComponent],
      providers: [],
    }).compileComponents();
    fixture = TestBed.createComponent(DsvCardComponent);
    component = fixture.componentInstance;
  });

  it('should render new model', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
