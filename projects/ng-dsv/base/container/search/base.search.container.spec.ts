import { ElementRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/modules/auth';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SeoService } from '../../service/seo/seo.service';
import { BaseSearchContainer } from './base.search.container';

function makeMockService(overrides = {}) {
    return {
        isLoading: signal(false),
        datas: signal([]),
        search: signal(''),
        stopFetch: signal(false),
        ssr: signal(true),
        page: signal(1),
        fetchByPage: vi.fn(),
        ...overrides,
    };
}

const mockAuthService = {
    canFetch: signal(true),
};
const mockSeoService = {};

const mockElementRef = {
    nativeElement: {
        querySelector: vi.fn().mockReturnValue(null),
    },
};

class TestSearchContainer extends BaseSearchContainer<any, any> {
    constructor(service: any) {
        super(service);
    }
}

describe('BaseSearchContainer', () => {
    let mockService: ReturnType<typeof makeMockService>;
    let container: TestSearchContainer;

    beforeEach(() => {
        vi.clearAllMocks();
        mockService = makeMockService();

        TestBed.configureTestingModule({
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: SeoService, useValue: mockSeoService },
                { provide: ElementRef, useValue: mockElementRef },
            ],
        });

        container = TestBed.runInInjectionContext(() => new TestSearchContainer(mockService));
    });

    describe('constructor', () => {
        it('when instantiated, then service should be assigned', () => {
            expect(container.service).toBe(mockService);
        });

        it('when instantiated, then isLoading should be set to true', () => {
            expect(mockService.isLoading()).toBe(true);
        });

        it('when datas is empty, search is empty and stopFetch is false, then doFetch should be called', () => {
            const spy = vi.spyOn(container, 'doFetch');
            container = TestBed.runInInjectionContext(() => new TestSearchContainer(mockService));
            TestBed.tick();
            expect(spy).toHaveBeenCalled();
        });

        it('when datas has items, then doFetch should not be called by the effect', () => {
            mockService = makeMockService({ datas: signal([{ id: '1' }]) });
            const spy = vi.fn();
            container = TestBed.runInInjectionContext(() => new TestSearchContainer(mockService));
            container.doFetch = spy;
            TestBed.tick();
            expect(spy).not.toHaveBeenCalled();
        });

        it('when search is not empty, then doFetch should not be called by the effect', () => {
            mockService = makeMockService({ search: signal('hello') });
            const spy = vi.fn();
            container = TestBed.runInInjectionContext(() => new TestSearchContainer(mockService));
            container.doFetch = spy;
            TestBed.tick();
            expect(spy).not.toHaveBeenCalled();
        });

        it('when stopFetch is true, then doFetch should not be called by the effect', () => {
            mockService = makeMockService({ stopFetch: signal(true) });
            const spy = vi.fn();
            container = TestBed.runInInjectionContext(() => new TestSearchContainer(mockService));
            container.doFetch = spy;
            TestBed.tick();
            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('doFetch()', () => {
        it('when called without argument, then fetchByPage should be called with current search and page', () => {
            mockService.search.set('angular');
            mockService.page.set(2);
            container.doFetch();
            expect(mockService.fetchByPage).toHaveBeenCalledWith('angular', 2);
        });

        it('when called with a search argument, then fetchByPage should be called with that search', () => {
            container.doFetch('vitest');
            expect(mockService.fetchByPage).toHaveBeenCalledWith('vitest', 1);
        });
    });

    describe('doSearch()', () => {
        it('when called, then page should be reset to 1', () => {
            mockService.page.set(5);
            container.doSearch('query');
            expect(mockService.page()).toBe(1);
        });

        it('when called with a search term, then fetchByPage should be called with that term', () => {
            container.doSearch('angular');
            expect(mockService.fetchByPage).toHaveBeenCalledWith('angular', 1);
        });
    });
});
