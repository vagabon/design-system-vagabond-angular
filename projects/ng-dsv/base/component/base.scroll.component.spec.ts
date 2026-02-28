import { EnvironmentInjector, provideZonelessChangeDetection, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaseScrollComponent, ScrollService } from '../public-api';

describe('BaseScrollComponent', () => {
    let scrollServiceMock: jest.Mocked<ScrollService>;

    beforeEach(() => {
        scrollServiceMock = {
            getlocked: jest.fn(),
            doBlocked: jest.fn(),
            doBlockedWithTimeout: jest.fn(),
        } as unknown as jest.Mocked<ScrollService>;

        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                { provide: ScrollService, useValue: scrollServiceMock },
            ],
        });
    });

    class TestScrollComponent extends BaseScrollComponent {
        doLoad(): void { }
    }

    it('should call scrollService methods in loadMore()', () => {
        scrollServiceMock.getlocked.mockReturnValue(false);
        const doLoadSpy = jest.fn();

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