import { EnvironmentInjector, provideZonelessChangeDetection, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { BaseRouteComponent } from './base.route.component';

describe('BaseRouteComponent', () => {
    let routerEvents$: Subject<any>;
    let component: TestComponent;

    class TestComponent extends BaseRouteComponent {
    }

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
                { provide: Router, useValue: { events: routerEvents$.asObservable() } }
            ]
        });

        runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
            component = new TestComponent();
        });
    });

    it('should set navigated signal to true on router event', () => {
        expect(component.routeParams()).not.toBeNull();
    });
});
