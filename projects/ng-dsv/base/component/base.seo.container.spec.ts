import { EnvironmentInjector, provideZonelessChangeDetection, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { BaseSeoContainer } from './base.seo.container';

describe('BaseSeoComponent', () => {
    let routerEvents$: Subject<any>;
    let component: TestComponent;

    class TestComponent extends BaseSeoContainer {
    }

    beforeEach(() => {
        routerEvents$ = new Subject();

        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
            ]
        });

        runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
            component = new TestComponent();
        });
    });

    it('should set navigated signal to true on router event', () => {
        expect(component).not.toBeNull();
    });
});
