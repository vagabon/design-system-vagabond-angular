import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvContainerComponent } from './container.component';

describe('DsvContainerComponent', () => {
  let component: DsvContainerComponent;
  let fixture: ComponentFixture<DsvContainerComponent>;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => { } } } };
    await TestBed.configureTestingModule({
      imports: [DsvContainerComponent],
      providers: [
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DsvContainerComponent);
    component = fixture.componentInstance;
  });

  it('should render', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
