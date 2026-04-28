import { ElementRef } from '@angular/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SCROLL_CLASS, SCROLL_ID, scrollToClosestTop, scrollToTop } from './scroll.utils';

const mockScrollTo = vi.fn();
export const createElementRef = (querySelector: ReturnType<typeof vi.fn>): ElementRef => ({
    nativeElement: { querySelector },
});

describe('scroll utils', () => {
    beforeEach(() => {
        mockScrollTo.mockClear();
    });

    describe('scrollToTop', () => {
        it('should scroll to top with default selector', () => {
            const mockElement = { scrollTo: mockScrollTo };
            const querySelector = vi.fn().mockReturnValue(mockElement);
            const elementRef = createElementRef(querySelector);

            scrollToTop(elementRef);

            expect(querySelector).toHaveBeenCalledWith(SCROLL_ID);
            expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
        });

        it('should scroll to top with custom selector', () => {
            const mockElement = { scrollTo: mockScrollTo };
            const querySelector = vi.fn().mockReturnValue(mockElement);
            const elementRef = createElementRef(querySelector);

            scrollToTop(elementRef, '.custom');

            expect(querySelector).toHaveBeenCalledWith('.custom');
            expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
        });

        it('should not throw if element is not found', () => {
            const querySelector = vi.fn().mockReturnValue(null);
            const elementRef = createElementRef(querySelector);

            expect(() => scrollToTop(elementRef)).not.toThrow();
        });
    });

    describe('scrollToClosestTop', () => {
        it('should scroll closest to top with default selector', () => {
            const mockClosest = { scrollTo: mockScrollTo };
            const mockElement = { closest: vi.fn().mockReturnValue(mockClosest) };
            const querySelector = vi.fn().mockReturnValue(mockElement);
            const elementRef = createElementRef(querySelector);

            scrollToClosestTop(elementRef);

            expect(querySelector).toHaveBeenCalledWith(SCROLL_CLASS);
            expect(mockElement.closest).toHaveBeenCalledWith(SCROLL_CLASS);
            expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
        });

        it('should scroll closest to top with custom selector', () => {
            const mockClosest = { scrollTo: mockScrollTo };
            const mockElement = { closest: vi.fn().mockReturnValue(mockClosest) };
            const querySelector = vi.fn().mockReturnValue(mockElement);
            const elementRef = createElementRef(querySelector);

            scrollToClosestTop(elementRef, '.custom');

            expect(querySelector).toHaveBeenCalledWith('.custom');
            expect(mockElement.closest).toHaveBeenCalledWith('.custom');
            expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
        });

        it('should not throw if querySelector returns null', () => {
            const querySelector = vi.fn().mockReturnValue(null);
            const elementRef = createElementRef(querySelector);

            expect(() => scrollToClosestTop(elementRef)).not.toThrow();
        });

        it('should not throw if closest returns null', () => {
            const mockElement = { closest: vi.fn().mockReturnValue(null) };
            const querySelector = vi.fn().mockReturnValue(mockElement);
            const elementRef = createElementRef(querySelector);

            expect(() => scrollToClosestTop(elementRef)).not.toThrow();
        });
    });
});
