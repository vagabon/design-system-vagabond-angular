import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastService } from '../service/toast.service';
import { DsvToastComponent } from './toast.component';

describe('DsvToastComponent', () => {
  let component: DsvToastComponent;
  let fixture: ComponentFixture<DsvToastComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => {} } } };
    await TestBed.configureTestingModule({
      imports: [DsvToastComponent],
      providers: [],
    }).compileComponents();
    toastService = TestBed.inject(ToastService);
    fixture = TestBed.createComponent(DsvToastComponent);
    component = fixture.componentInstance;
  });

  it('should render', () => {
    toastService.toasts = signal([
      {
        uuid: 'uuid',
        text: 'text',
      },
    ]);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
