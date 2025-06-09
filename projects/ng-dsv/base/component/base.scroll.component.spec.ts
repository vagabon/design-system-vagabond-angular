import { EnvironmentInjector, provideZonelessChangeDetection, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaseScrollComponent, ScrollService } from '../public-api';

describe('BaseScrollComponent', () => {
    let scrollServiceMock: jasmine.SpyObj<ScrollService>;

    beforeEach(() => {
        scrollServiceMock = jasmine.createSpyObj<ScrollService>('ScrollService', [
            'getlocked',
            'doBlocked',
            'doBlockedWithTimeout',
        ]);

        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                { provide: ScrollService, useValue: scrollServiceMock },
            ],
        });
    });

    class TestScrollComponent extends BaseScrollComponent {
        doLoad(): void {
        }
    }

    it('should call scrollService methods in loadMore()', () => {
        scrollServiceMock.getlocked.and.returnValue(false);
        const doLoadSpy = jasmine.createSpy('doLoad');

        let component: TestScrollComponent;

        runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
            const component = new TestScrollComponent();
            component.doLoad = doLoadSpy;

            component.loadMore();

            expect(scrollServiceMock.getlocked).toHaveBeenCalled();
            expect(scrollServiceMock.doBlocked).toHaveBeenCalled();
            expect(doLoadSpy).toHaveBeenCalled();
            expect(scrollServiceMock.doBlockedWithTimeout).toHaveBeenCalledWith(false, 500);
        });
    });
});
