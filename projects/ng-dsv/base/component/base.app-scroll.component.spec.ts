import { EnvironmentInjector, provideZonelessChangeDetection, runInInjectionContext, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationStart, Router } from '@angular/router';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { Subject } from 'rxjs';
import { BaseAppScrollComponent, ScrollService } from '../public-api';

describe('BaseAppScrollComponent', () => {
    let routerEvents$: Subject<any>;
    let scrollServiceMock: jasmine.SpyObj<ScrollService>;
    let apiServiceMock: jasmine.SpyObj<ApiService>;
    let environmentServiceMock: jasmine.SpyObj<EnvironmentService>;
    let component: TestComponent;

    // Classe concrète pour tester l'abstraite
    class TestComponent extends BaseAppScrollComponent { }

    beforeEach(() => {
        routerEvents$ = new Subject();

        scrollServiceMock = jasmine.createSpyObj('ScrollService', ['getScroll', 'saveScroll'], {
            scroll: signal(0)
        });

        apiServiceMock = jasmine.createSpyObj('ApiService', ['setBaseUrl']);
        environmentServiceMock = jasmine.createSpyObj('EnvironmentService', [], {
            env: () => ({ API_URL: 'https://fake.api' })
        });

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

    it('should set API baseUrl when env is available', () => {
        setTimeout(() => {
            expect(apiServiceMock.setBaseUrl).toHaveBeenCalledWith('https://fake.api');
            expect(component.load()).toBeTrue();
        }, 1000);
    });

    it('should restore scroll on router navigation', () => {
        const scrollEl = document.createElement('div');
        scrollEl.className = 'scroll';
        spyOn(scrollEl, 'scrollTo');
        document.body.appendChild(scrollEl);

        scrollServiceMock.getScroll.and.returnValue(120);

        routerEvents$.next(new NavigationStart(1, '/some-path'));

        expect(scrollEl.scrollTo).toHaveBeenCalled();

        scrollEl.remove();
    });

    it('should call saveScroll and set scroll on doScroll', () => {
        const scrollEl = document.createElement('div');
        scrollEl.className = 'scroll';
        scrollEl.scrollTop = 300;
        document.body.appendChild(scrollEl);

        component.doScroll();

        expect(scrollServiceMock.saveScroll).toHaveBeenCalled();
        expect(scrollServiceMock.scroll()).toBe(0);

        scrollEl.remove();
    });
});
