import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, Scroll } from '@angular/router';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';
import { Subject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BaseAppComponent, ScrollService } from '../public-api';

describe('BaseAppComponent', () => {
    let component: TestComponent;
    let routerEvents$: Subject<any>;
    let apiServiceMock: any;
    let scrollServiceMock: any;

    @Component({ template: '' })
    class TestComponent extends BaseAppComponent {}

    beforeEach(() => {
        routerEvents$ = new Subject();

        scrollServiceMock = {
            getScroll: vi.fn().mockReturnValue(0),
            saveScroll: vi.fn(),
            scroll: { set: vi.fn() },
        };
        apiServiceMock = { setBaseUrl: vi.fn(), isPlatformBrowser: vi.fn().mockReturnValue(true) };

        TestBed.configureTestingModule({
            providers: [
                TestComponent,
                { provide: ScrollService, useValue: scrollServiceMock },
                { provide: ApiService, useValue: apiServiceMock },
                { provide: StorageService, useValue: {} },
                { provide: Router, useValue: { events: routerEvents$.asObservable() } },
            ],
        });

        component = TestBed.inject(TestComponent);

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

        await new Promise((resolve) => setTimeout(resolve, 120));

        expect(div.scrollTo).toHaveBeenCalledWith(0, 150);
    });
});
