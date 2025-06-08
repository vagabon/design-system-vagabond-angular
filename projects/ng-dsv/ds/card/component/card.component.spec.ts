import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvCardComponent } from './card.component';

describe('DsvCardComponent', () => {
  let component: DsvCardComponent;
  let fixture: ComponentFixture<DsvCardComponent>;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => { } } } };
    await TestBed.configureTestingModule({
      imports: [DsvCardComponent],
      providers: [
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DsvCardComponent);
    component = fixture.componentInstance;
  });

  it('should render', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
