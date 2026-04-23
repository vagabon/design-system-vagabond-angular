import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { RouterService } from './router.service';

const routerEvents$ = new Subject<any>();

const mockRouter = {
    url: '/initial',
    events: routerEvents$.asObservable(),
};

describe('RouterService', () => {
    let service: RouterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RouterService, { provide: Router, useValue: mockRouter }],
        });

        service = TestBed.inject(RouterService);
    });

    it('when service is created, then currentUrl() should be the initial router url', () => {
        expect(service.currentUrl()).toBe('/initial');
    });

    it('when a NavigationEnd event is emitted, then currentUrl() should update to urlAfterRedirects', () => {
        TestBed.runInInjectionContext(() => {
            routerEvents$.next(new NavigationEnd(1, '/old', '/new-url'));
        });
        expect(service.currentUrl()).toBe('/new-url');
    });

    it('when a non-NavigationEnd event is emitted, then currentUrl() should not change', () => {
        TestBed.runInInjectionContext(() => {
            routerEvents$.next({ type: 'NavigationStart' });
        });
        expect(service.currentUrl()).toBe('/initial');
    });

    it('when multiple NavigationEnd events are emitted, then currentUrl() should reflect the last one', () => {
        TestBed.runInInjectionContext(() => {
            routerEvents$.next(new NavigationEnd(1, '/a', '/page-a'));
            routerEvents$.next(new NavigationEnd(2, '/b', '/page-b'));
        });
        expect(service.currentUrl()).toBe('/page-b');
    });
});
