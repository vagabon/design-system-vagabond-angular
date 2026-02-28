import {
  EnvironmentInjector,
  provideZonelessChangeDetection,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationStart, Router } from '@angular/router';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { Subject } from 'rxjs';
import { BaseAppScrollComponent, ScrollService } from '../public-api';

describe('BaseAppScrollComponent', () => {
  let routerEvents$: Subject<any>;
  let scrollServiceMock: jest.Mocked<ScrollService>;
  let apiServiceMock: jest.Mocked<ApiService>;
  let environmentServiceMock: jest.Mocked<EnvironmentService>;
  let component: TestComponent;

  class TestComponent extends BaseAppScrollComponent { }

  beforeEach(() => {
    routerEvents$ = new Subject();

    scrollServiceMock = {
      getScroll: jest.fn(),
      saveScroll: jest.fn(),
      scroll: signal(0),
    } as unknown as jest.Mocked<ScrollService>;

    apiServiceMock = {
      setBaseUrl: jest.fn(),
    } as unknown as jest.Mocked<ApiService>;

    environmentServiceMock = {
      env: () => ({ API_URL: 'https://fake.api' }),
    } as unknown as jest.Mocked<EnvironmentService>;

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: Router, useValue: { events: routerEvents$.asObservable() } },
        { provide: ScrollService, useValue: scrollServiceMock },
        { provide: ApiService, useValue: apiServiceMock },
        { provide: EnvironmentService, useValue: environmentServiceMock },
      ],
    });

    runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
      component = new TestComponent();
    });
  });

  it('should restore scroll on router navigation', () => {
    const scrollEl = document.createElement('div');
    scrollEl.className = 'scroll';

    // Ajouter la méthode scrollTo avant de créer le spy
    scrollEl.scrollTo = jest.fn();

    document.body.appendChild(scrollEl);

    scrollServiceMock.getScroll.mockReturnValue(120);

    routerEvents$.next(new NavigationStart(1, '/some-path'));

    expect(scrollEl.scrollTo).not.toHaveBeenCalled();

    scrollEl.remove();
  });

  it('should call saveScroll and set scroll on doScroll', () => {
    const scrollEl = document.createElement('div');
    scrollEl.className = 'scroll';
    scrollEl.scrollTop = 300;
    document.body.appendChild(scrollEl);

    component.doScroll();

    expect(scrollServiceMock.saveScroll).toHaveBeenCalled();
    expect(scrollServiceMock.scroll()).toBe(300);

    scrollEl.remove();
  });
});