import { beforeEach, describe, expect, it, vi } from 'vitest';
import { scrollOnClassTo } from './scroll.utils';

describe('scrollOnClassTo', () => {
    let mockScrollTo: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockScrollTo = vi.fn();
        document.body.innerHTML = `
            <div class="scroll-class"></div>
            <div class="scroll-class"></div>
        `;
        document.querySelectorAll('.scroll-class').forEach((el) => {
            el.scrollTo = mockScrollTo as any;
        });
    });

    it('should scroll all elements when no index is provided', () => {
        scrollOnClassTo('scroll-class', 100, 200);

        expect(mockScrollTo).toHaveBeenCalledTimes(2);
        expect(mockScrollTo).toHaveBeenCalledWith(100, 200);
    });

    it('should scroll only the element at the given index', () => {
        scrollOnClassTo('scroll-class', 100, 200, 1);

        expect(mockScrollTo).toHaveBeenCalledTimes(1);
        expect(mockScrollTo).toHaveBeenCalledWith(100, 200);
    });
});
