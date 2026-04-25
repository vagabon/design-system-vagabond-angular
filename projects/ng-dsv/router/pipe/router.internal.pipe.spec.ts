import { ElementRef, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { describe, expect, it, vi } from 'vitest';
import { RouterInternalPipe } from './router.internal.pipe';

const createDirective = (href: string | null) => {
    TestBed.configureTestingModule({
        providers: [
            provideZonelessChangeDetection(),
            provideRouter([]),
            RouterInternalPipe,
            {
                provide: ElementRef,
                useValue: { nativeElement: { getAttribute: vi.fn().mockReturnValue(href) } },
            },
        ],
    });
    return {
        directive: TestBed.inject(RouterInternalPipe),
        router: TestBed.inject(Router),
    };
};

describe('RouterInternalPipe', () => {
    it('should create', () => {
        const { directive } = createDirective('/home');
        expect(directive).toBeTruthy();
    });

    describe('onClick', () => {
        it('When href is valid, Then should prevent default, stop propagation, scroll top and navigate', () => {
            const { directive, router } = createDirective('/home');
            const navigateSpy = vi.spyOn(router, 'navigate');
            const scrollSpy = vi.spyOn(window, 'scrollTo');
            const event = { stopPropagation: vi.fn(), preventDefault: vi.fn() } as unknown as Event;

            directive.onClick(event);

            expect(event.stopPropagation).toHaveBeenCalledOnce();
            expect(event.preventDefault).toHaveBeenCalledOnce();
            expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
            expect(navigateSpy).toHaveBeenCalledWith(['/home']);
        });

        it('When href is #, Then should emit dsvLink and not navigate', () => {
            const { directive, router } = createDirective('#');
            const navigateSpy = vi.spyOn(router, 'navigate');
            const emitSpy = vi.spyOn(directive.dsvLink, 'emit');
            const event = { stopPropagation: vi.fn(), preventDefault: vi.fn() } as unknown as Event;

            directive.onClick(event);

            expect(emitSpy).toHaveBeenCalledOnce();
            expect(navigateSpy).not.toHaveBeenCalled();
        });

        it('When href is null, Then should emit dsvLink and not navigate', () => {
            const { directive, router } = createDirective(null);
            const navigateSpy = vi.spyOn(router, 'navigate');
            const emitSpy = vi.spyOn(directive.dsvLink, 'emit');
            const event = { stopPropagation: vi.fn(), preventDefault: vi.fn() } as unknown as Event;

            directive.onClick(event);

            expect(emitSpy).toHaveBeenCalledOnce();
            expect(navigateSpy).not.toHaveBeenCalled();
        });
    });
});
