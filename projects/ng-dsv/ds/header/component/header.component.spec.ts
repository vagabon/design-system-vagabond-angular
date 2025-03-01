import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvHeaderComponent } from './header.component';

describe('ChatbotModelComponent', () => {
  let component: DsvHeaderComponent;
  let fixture: ComponentFixture<DsvHeaderComponent>;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => {} } } };
    await TestBed.configureTestingModule({
      imports: [DsvHeaderComponent],
      providers: [],
    }).compileComponents();
    fixture = TestBed.createComponent(DsvHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should render new model', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
