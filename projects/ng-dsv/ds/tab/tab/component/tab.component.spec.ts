import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { provideTranslateService, TranslatePipe } from '@ngx-translate/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TabDto } from '../dto/tab.dto';
import { TabComponent } from './tab.component';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  const tabMock: TabDto = { id: 'tab1', title: 'Tab 1' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabComponent, TranslatePipe],
      providers: [
        provideZonelessChangeDetection(),
        provideTranslateService(),
        { provide: ActivatedRoute, useValue: { snapshot: {}, params: {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    component.tab = signal(tabMock) as unknown as InputSignal<TabDto>;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render tab title', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent).toContain(tabMock.title);
  });

  it('should apply selected class when isSelected is true', () => {
    component.isSelected = signal(true) as unknown as InputSignal<boolean>;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.classList.contains('selected')).toBe(true);
  });

  it('should emit callback if tab has no URL', () => {
    const button = fixture.debugElement.query(By.css('button'));
    const callbackSpy = vi.fn();
    component.callback.subscribe(callbackSpy);

    const event = new Event('click');
    vi.spyOn(event, 'stopPropagation');

    fixture.detectChanges();

    button.triggerEventHandler('click', event);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(callbackSpy).toHaveBeenCalledWith(tabMock);
  });

  it('should not emit callback if tab has URL', () => {
    const tabWithUrl: TabDto = { id: 'tab2', title: 'Tab 2', url: '/test' };
    component.tab = signal(tabWithUrl) as unknown as InputSignal<TabDto>;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    const callbackSpy = vi.fn();
    component.callback.subscribe(callbackSpy);

    const event = new Event('click');
    vi.spyOn(event, 'stopPropagation');

    button.triggerEventHandler('click', event);
    expect(event.stopPropagation).not.toHaveBeenCalled();
    expect(callbackSpy).not.toHaveBeenCalled();
  });
});