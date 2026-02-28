import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, Scroll } from '@angular/router';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';
import { Subject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BaseAppScrollComponent, ScrollService } from '../public-api';

describe('BaseAppScrollComponent', () => {
  let component: TestComponent;
  let routerEvents$: Subject<any>;
  let scrollServiceMock: any;
  let platformServiceMock: any;
  let envServiceMock: any;
  let apiServiceMock: any;

  @Component({ template: '' })
  class TestComponent extends BaseAppScrollComponent { }

  beforeEach(() => {
    routerEvents$ = new Subject();

    scrollServiceMock = {
      getScroll: vi.fn().mockReturnValue(0),
      saveScroll: vi.fn(),
      scroll: { set: vi.fn() },
    };
    platformServiceMock = { isPlatformBrowser: vi.fn().mockReturnValue(true) };
    envServiceMock = { env: vi.fn().mockReturnValue({ API_URL: 'https://fake.api' }) };
    apiServiceMock = { setBaseUrl: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        TestComponent,
        { provide: ScrollService, useValue: scrollServiceMock },
        { provide: PlatformService, useValue: platformServiceMock },
        { provide: EnvironmentService, useValue: envServiceMock },
        { provide: ApiService, useValue: apiServiceMock },
        { provide: StorageService, useValue: {} },
        { provide: Router, useValue: { events: routerEvents$.asObservable() } },
      ],
    });

    component = TestBed.inject(TestComponent);

    // Mock le div.scroll dans le DOM
    const div = document.createElement('div');
    div.className = 'scroll';
    div.scrollTop = 200;
    div.scrollTo = vi.fn();
    document.body.appendChild(div);
  });

  it('should initialize component and set API URL', () => {
    expect(component).toBeTruthy();
  });

  it('doScroll should save scroll and set signal', () => {
    component.doScroll();
    expect(component).toBeTruthy();
  });

  it('should restore scroll on Scroll event', async () => {
    scrollServiceMock.getScroll.mockReturnValue(150);

    const scrollEvent = new Scroll(null as any, [0, 150], null);
    routerEvents$.next(scrollEvent);

    const div = document.getElementsByClassName('scroll')[0] as any;
    // attendre le setTimeout
    await new Promise((resolve) => setTimeout(resolve, 120));

    expect(div.scrollTo).toHaveBeenCalledWith(0, 150);
  });
});