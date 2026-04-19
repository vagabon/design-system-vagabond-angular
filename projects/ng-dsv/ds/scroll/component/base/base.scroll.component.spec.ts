import { EnvironmentInjector, provideZonelessChangeDetection, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ScrollService } from '../../public-api';
import { BaseScrollComponent } from './base.scroll.component';

describe('BaseScrollComponent', () => {
    let scrollServiceMock: {
        getlocked: ReturnType<typeof vi.fn>;
        doBlocked: ReturnType<typeof vi.fn>;
        doBlockedWithTimeout: ReturnType<typeof vi.fn>;
    };

    beforeEach(() => {
        scrollServiceMock = {
            getlocked: vi.fn(),
            doBlocked: vi.fn(),
            doBlockedWithTimeout: vi.fn(),
        };

        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                { provide: ScrollService, useValue: scrollServiceMock },
            ],
        });
    });

    class TestScrollComponent extends BaseScrollComponent {
        doLoad(): void {}
    }

    it('should call scrollService methods in loadMore()', () => {
        scrollServiceMock.getlocked.mockReturnValue(false);
        const doLoadSpy = vi.fn();

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
