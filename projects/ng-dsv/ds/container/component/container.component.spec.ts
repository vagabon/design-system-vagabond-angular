import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvContainerComponent } from './container.component';

describe('ChatbotModelComponent', () => {
  let component: DsvContainerComponent;
  let fixture: ComponentFixture<DsvContainerComponent>;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => {} } } };
    await TestBed.configureTestingModule({
      imports: [DsvContainerComponent],
      providers: [],
    }).compileComponents();
    fixture = TestBed.createComponent(DsvContainerComponent);
    component = fixture.componentInstance;
  });

  it('should render new model', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
