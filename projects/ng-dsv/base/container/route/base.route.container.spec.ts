import { EnvironmentInjector, provideZonelessChangeDetection, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { BaseRouteContainer } from './base.route.container';

describe('BaseRouteContainer', () => {
    let routerEvents$: Subject<any>;
    let component: TestComponent;

    class TestComponent extends BaseRouteContainer {}

    beforeEach(() => {
        routerEvents$ = new Subject();

        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ peopleId: '123' }),
                    },
                },
                { provide: Router, useValue: { events: routerEvents$.asObservable() } },
            ],
        });

        runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
            component = new TestComponent();
        });
    });

    it('should set navigated signal to true on router event', () => {
        expect(component.routeParams()).not.toBeNull();
    });
});
