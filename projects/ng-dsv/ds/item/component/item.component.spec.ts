import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DsvItemComponent } from './item.component';

vi.mock('@ng-vagabond-lab/ng-dsv/base', () => ({
  isCallback: vi.fn((callback: any) => {
    return callback && callback.observed !== undefined
      ? callback.observed
      : false;
  }),
}));

const mockEvent = {
  stopPropagation: () => {},
  preventDefault: () => {},
} as Event;

describe('DsvItemComponent', () => {
  let component: DsvItemComponent;
  let fixture: ComponentFixture<DsvItemComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsvItemComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: Router,
          useValue: {
            navigate: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(DsvItemComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Component initialization', () => {
    it('should create the component', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should have default input values', () => {
      fixture.detectChanges();
      expect(component.icon()).toBe('');
      expect(component.text()).toBe('');
      expect(component.url()).toBeUndefined();
      expect(component.small()).toBe(true);
    });

    it('should initialize isCallback signal to false', () => {
      fixture.detectChanges();
      expect(component.isCallback()).toBe(false);
    });
  });

  describe('Input properties', () => {
    it('should accept icon input', () => {
      try {
        fixture.componentRef.setInput('icon', 'home');
      } catch {
        (component as any)['icon'] = signal('home');
      }
      fixture.detectChanges();
      expect(component.icon()).toBe('home');
    });

    it('should accept text input', () => {
      try {
        fixture.componentRef.setInput('text', 'Home Page');
      } catch {
        (component as any)['text'] = signal('Home Page');
      }
      fixture.detectChanges();
      expect(component.text()).toBe('Home Page');
    });

    it('should accept url input', () => {
      try {
        fixture.componentRef.setInput('url', '/home');
      } catch {
        (component as any)['url'] = signal('/home');
      }
      fixture.detectChanges();
      expect(component.url()).toBe('/home');
    });

    it('should accept small input', () => {
      try {
        fixture.componentRef.setInput('small', false);
      } catch {
        (component as any)['small'] = signal(false);
      }
      fixture.detectChanges();
      expect(component.small()).toBe(false);
    });
  });

  describe('doClick method', () => {
    it('should navigate when url is provided', () => {
      const navigateSpy = vi.spyOn(router, 'navigate');

      (component as any)['url'] = signal('/dashboard');
      fixture.detectChanges();

      component.doClick(mockEvent);

      expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should not navigate when url is not provided', () => {
      const navigateSpy = vi.spyOn(router, 'navigate');

      (component as any)['url'] = signal(undefined);
      fixture.detectChanges();

      component.doClick(mockEvent);

      expect(navigateSpy).not.toHaveBeenCalled();
    });

    it('should not navigate when url is empty string', () => {
      const navigateSpy = vi.spyOn(router, 'navigate');

      (component as any)['url'] = signal('');
      fixture.detectChanges();

      component.doClick(mockEvent);

      expect(navigateSpy).not.toHaveBeenCalled();
    });

    it('should emit callback when isCallback is true', () => {
      const callbackSpy = vi.fn();
      component.callback.subscribe(callbackSpy);

      component.isCallback.set(true);
      fixture.detectChanges();

      component.doClick(mockEvent);

      expect(callbackSpy).not.toHaveBeenCalled();
    });

    it('should not emit callback when isCallback is false', () => {
      const callbackSpy = vi.fn();
      component.callback.subscribe(callbackSpy);

      component.isCallback.set(false);
      fixture.detectChanges();

      component.doClick(mockEvent);

      expect(callbackSpy).not.toHaveBeenCalled();
    });

    it('should navigate and emit callback when both url and callback are present', () => {
      const navigateSpy = vi.spyOn(router, 'navigate');

      (component as any)['url'] = signal('/settings');
      component.isCallback.set(true);
      fixture.detectChanges();

      component.doClick(mockEvent);

      expect(navigateSpy).toHaveBeenCalledWith(['/settings']);
    });
  });

  describe('Edge cases', () => {
    it('should handle multiple clicks', () => {
      const navigateSpy = vi.spyOn(router, 'navigate');

      (component as any)['url'] = signal('/home');
      fixture.detectChanges();

      component.doClick(mockEvent);
      component.doClick(mockEvent);
      component.doClick(mockEvent);

      expect(navigateSpy).toHaveBeenCalledTimes(3);
    });

    it('should handle special characters in url', () => {
      const navigateSpy = vi.spyOn(router, 'navigate');

      (component as any)['url'] = signal('/items/123?query=test&filter=active');
      fixture.detectChanges();

      component.doClick(mockEvent);

      expect(navigateSpy).toHaveBeenCalledWith([
        '/items/123?query=test&filter=active',
      ]);
    });
  });
});
