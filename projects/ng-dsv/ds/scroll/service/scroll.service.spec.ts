import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { describe, expect, it } from 'vitest';
import { ScrollService } from './scroll.service';

const mockRouterService = { router: { url: '/home' } };

const setup = () => {
    TestBed.configureTestingModule({
        providers: [
            provideZonelessChangeDetection(),
            provideRouter([]),
            { provide: RouterService, useValue: mockRouterService },
            ScrollService,
        ],
    });
    return TestBed.inject(ScrollService);
};

describe('ScrollService', () => {
    it('should create', () => {
        expect(setup()).toBeTruthy();
    });

    describe('getRouteUuid', () => {
        it('When called twice with same index, Then should return same uuid', () => {
            const service = setup();
            const id1 = service.getRouteUuid(0);
            const id2 = service.getRouteUuid(0);
            expect(id1).toBe(id2);
        });

        it('When called with different indexes, Then should return different uuids', () => {
            const service = setup();
            expect(service.getRouteUuid(0)).not.toBe(service.getRouteUuid(1));
        });

        it('When called with no argument, Then should default to index 0', () => {
            const service = setup();
            expect(service.getRouteUuid()).toBe(service.getRouteUuid(0));
        });
    });

    describe('saveScroll', () => {
        it('When saving a scroll position, Then should be retrievable via getScroll', () => {
            const service = setup();
            service.saveScroll('id1', '/home', 100, 50);
            expect(service.getScroll('id1', '/home')).toEqual({ top: 100, left: 50 });
        });

        it('When saving multiple urls for same id, Then should store all independently', () => {
            const service = setup();
            service.saveScroll('id1', '/home', 100, 50);
            service.saveScroll('id1', '/about', 200, 0);
            expect(service.getScroll('id1', '/home')).toEqual({ top: 100, left: 50 });
            expect(service.getScroll('id1', '/about')).toEqual({ top: 200, left: 0 });
        });

        it('When overwriting a scroll position, Then should return the latest value', () => {
            const service = setup();
            service.saveScroll('id1', '/home', 100, 50);
            service.saveScroll('id1', '/home', 300, 20);
            expect(service.getScroll('id1', '/home')).toEqual({ top: 300, left: 20 });
        });
    });

    describe('getScroll', () => {
        it('When id does not exist, Then should return default position', () => {
            const service = setup();
            expect(service.getScroll('unknown', '/home')).toEqual({ top: 0, left: 0 });
        });

        it('When url does not exist for id, Then should return default position', () => {
            const service = setup();
            service.saveScroll('id1', '/home', 100, 50);
            expect(service.getScroll('id1', '/unknown')).toEqual({ top: 0, left: 0 });
        });
    });

    describe('clear', () => {
        it('When clearing an id, Then should return default position afterwards', () => {
            const service = setup();
            service.saveScroll('id1', '/home', 100, 50);
            service.clear('id1');
            expect(service.getScroll('id1', '/home')).toEqual({ top: 0, left: 0 });
        });

        it('When clearing an id, Then should not affect other ids', () => {
            const service = setup();
            service.saveScroll('id1', '/home', 100, 50);
            service.saveScroll('id2', '/home', 200, 0);
            service.clear('id1');
            expect(service.getScroll('id2', '/home')).toEqual({ top: 200, left: 0 });
        });
    });
});
