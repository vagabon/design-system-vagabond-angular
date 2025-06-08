import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvHeaderComponent } from './header.component';

describe('DsvHeaderComponent', () => {
  let component: DsvHeaderComponent;
  let fixture: ComponentFixture<DsvHeaderComponent>;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => { } } } };
    await TestBed.configureTestingModule({
      imports: [DsvHeaderComponent],
      providers: [
        provideZonelessChangeDetection()
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DsvHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should render', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
