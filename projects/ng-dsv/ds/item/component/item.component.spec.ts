import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DsvItemComponent } from './item.component';

describe('DsvItemComponent', () => {
  let component: DsvItemComponent;
  let fixture: ComponentFixture<DsvItemComponent>;
  let router: Router;

  beforeEach(async () => {
    (window as any).google = { accounts: { id: { prompt: () => { } } } };
    await TestBed.configureTestingModule({
      imports: [DsvItemComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(DsvItemComponent);
    component = fixture.componentInstance;
  });

  it('When click on item them navigate should not to be called', () => {
    const navSpy = spyOn(router, 'navigate');
    doIt('');
    expect(navSpy).not.toHaveBeenCalled();
  });

  it('When click on item them navigate should be called', () => {
    const navSpy = spyOn(router, 'navigate');
    doIt('/url');
    expect(navSpy).toHaveBeenCalled();
  });

  const doIt = (url: string = '') => {
    component.url = signal(url) as unknown as InputSignal<string | undefined>;
    fixture.detectChanges();
    expect(component).toBeTruthy();

    const link = fixture.debugElement.nativeElement.querySelector('.text');
    link.click();
    fixture.detectChanges();
  };
});
