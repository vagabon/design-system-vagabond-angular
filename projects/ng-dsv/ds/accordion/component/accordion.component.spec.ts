import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService } from '@ngx-translate/core';
import { DsvAccordionComponent } from './accordion.component';

describe('DsvAccordionComponent', () => {
  let component: DsvAccordionComponent;
  let fixture: ComponentFixture<DsvAccordionComponent>;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => { } } } };
    await TestBed.configureTestingModule({
      imports: [DsvAccordionComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideTranslateService()
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DsvAccordionComponent);
    component = fixture.componentInstance;
  });

  it('should render', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.open'))).toBeFalsy();

    const link = fixture.debugElement.nativeElement.querySelector(
      '.dsv-accordion-header'
    );
    link.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.open'))).toBeTruthy();
  });
});
