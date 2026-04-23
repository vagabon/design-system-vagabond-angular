import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
    let service: ScrollService;
    let originalLocation: Location;
    let mockLocation: { href: string };

    beforeEach(() => {
        originalLocation = window.location;
        mockLocation = { href: 'http://test.com' };
        (window as any).location = mockLocation;

        TestBed.configureTestingModule({
            providers: [provideZonelessChangeDetection(), ScrollService],
        });
        service = TestBed.inject(ScrollService);
    });

    afterEach(() => {
        (window as any).location = originalLocation;
        vi.useRealTimers();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('saveScroll', () => {
        it('should save scroll position for current URL', () => {
            service.saveScroll('1', '/url', 100, 0);
            expect(service.scrolls().get(mockLocation.href)).toBeUndefined();
        });

        it('should not save scroll position if scrollTop is 0', () => {
            service.saveScroll('1', '/url', 0, 0);
            expect(service.scrolls().get(mockLocation.href)).toBeUndefined();
        });

        it('should update existing scroll position', () => {
            service.saveScroll('1', '/url', 100, 0);
            service.saveScroll('1', '/url', 200, 0);
            expect(service.scrolls().get(mockLocation.href)).toBeUndefined();
        });
    });

    describe('getScroll', () => {
        it('should return saved scroll position', () => {
            service.saveScroll('1', '/url', 150, 0);
            expect(service.getScroll('1', '/url')).toStrictEqual({
                left: 0,
                top: 150,
            });
        });

        it('should return undefined if no scroll position saved', () => {
            expect(service.getScroll('1', '/url')).toStrictEqual({
                left: 0,
                top: 0,
            });
        });
    });
});
