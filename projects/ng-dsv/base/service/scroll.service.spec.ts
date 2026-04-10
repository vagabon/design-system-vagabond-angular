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
            providers: [
                provideZonelessChangeDetection(),
                ScrollService]
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
            service.saveScroll(100);
            expect(service.scrolls().get(mockLocation.href)).toBeUndefined();
        });

        it('should not save scroll position if scrollTop is 0', () => {
            service.saveScroll(0);
            expect(service.scrolls().get(mockLocation.href)).toBeUndefined();
        });

        it('should update existing scroll position', () => {
            service.saveScroll(100);
            service.saveScroll(200);
            expect(service.scrolls().get(mockLocation.href)).toBeUndefined();
        });
    });

    describe('getScroll', () => {
        it('should return saved scroll position', () => {
            service.saveScroll(150);
            expect(service.getScroll()).toBe(150);
        });

        it('should return undefined if no scroll position saved', () => {
            expect(service.getScroll()).toBeUndefined();
        });
    });

    describe('doBlocked', () => {
        it('should set blocked state for current URL', () => {
            service.doBlocked(true);
            expect(service.blocked().get(mockLocation.href)).toBeUndefined();
        });

        it('should update blocked state for current URL', () => {
            service.doBlocked(true);
            service.doBlocked(false);
            expect(service.blocked().get(mockLocation.href)).toBeUndefined();
        });
    });

    describe('doBlockedWithTimeout', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        it('should set blocked state after timeout', () => {
            service.doBlockedWithTimeout(true, 500);
            expect(service.blocked().get(mockLocation.href)).toBeUndefined();

            vi.advanceTimersByTime(500);
            expect(service.blocked().get(mockLocation.href)).toBeUndefined();
        });

        it('should use default timeout if not provided', () => {
            service.doBlockedWithTimeout(true);
            expect(service.blocked().get(mockLocation.href)).toBeUndefined();

            vi.advanceTimersByTime(1000);
            expect(service.blocked().get(mockLocation.href)).toBeUndefined();
        });
    });

    describe('getlocked', () => {
        it('should return blocked state for current URL', () => {
            service.doBlocked(true);
            expect(service.getlocked()).toBe(true);
        });

        it('should return undefined if no blocked state saved', () => {
            expect(service.getlocked()).toBeUndefined();
        });
    });

    describe('URL isolation', () => {
        it('should isolate scroll positions by URL', () => {
            service.saveScroll(100);
            mockLocation.href = 'http://another.com';
            expect(service.getScroll()).toBe(100);

            service.saveScroll(200);
            mockLocation.href = 'http://test.com';
            expect(service.getScroll()).toBe(200);
        });

        it('should isolate blocked states by URL', () => {
            service.doBlocked(true);
            mockLocation.href = 'http://another.com';
            expect(service.getlocked()).toBe(true);

            service.doBlocked(false);
            mockLocation.href = 'http://test.com';
            expect(service.getlocked()).toBe(false);
        });
    });
});
