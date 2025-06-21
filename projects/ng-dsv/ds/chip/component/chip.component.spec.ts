import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { DsvChipComponent } from './chip.component';

describe('DsvChipComponent', () => {
  let component: DsvChipComponent;
  let fixture: ComponentFixture<DsvChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsvChipComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideTranslateService(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DsvChipComponent);
    component = fixture.componentInstance;
  });

  it('should render', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
