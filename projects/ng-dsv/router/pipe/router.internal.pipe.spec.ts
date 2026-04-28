import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RouterInternalPipe } from './router.internal.pipe';

const mockNavigate = vi.fn();
const mockScrollTo = vi.fn();

const createElementRef = (href: string | null) => {
    const mockClosest = { scrollTo: mockScrollTo };
    return {
        nativeElement: {
            getAttribute: vi.fn().mockReturnValue(href),
            closest: vi.fn().mockReturnValue(mockClosest),
        },
    } as unknown as ElementRef;
};

const mockEvent = () =>
    ({
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
    }) as unknown as Event;

describe('RouterInternalPipe', () => {
    let directive: RouterInternalPipe;
    let elementRef: ElementRef;

    const init = (href: string | null) => {
        elementRef = createElementRef(href);
        TestBed.configureTestingModule({
            providers: [
                RouterInternalPipe,
                { provide: Router, useValue: { navigate: mockNavigate } },
                { provide: ElementRef, useValue: elementRef },
            ],
        });
        directive = TestBed.inject(RouterInternalPipe);
    };

    beforeEach(() => {
        mockNavigate.mockClear();
        mockScrollTo.mockClear();
    });

    describe('onClick', () => {
        describe('When href is valid', () => {
            it('Then should prevent default and stop propagation', () => {
                init('/movies');
                const event = mockEvent();
                directive.onClick(event);
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });

            it('Then should scroll to top', () => {
                init('/movies');
                directive.onClick(mockEvent());
                expect(elementRef.nativeElement.closest).toHaveBeenCalledWith('.scroll');
                expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
            });

            it('Then should navigate to the url', () => {
                init('/movies');
                directive.onClick(mockEvent());
                expect(mockNavigate).toHaveBeenCalledWith(['/movies']);
            });

            it('Then should not emit dsvLink', () => {
                init('/movies');
                const emitSpy = vi.spyOn(directive.dsvLink, 'emit');
                directive.onClick(mockEvent());
                expect(emitSpy).not.toHaveBeenCalled();
            });
        });

        describe('When href is #', () => {
            it('Then should emit dsvLink and not navigate', () => {
                init('#');
                const emitSpy = vi.spyOn(directive.dsvLink, 'emit');
                directive.onClick(mockEvent());
                expect(emitSpy).toHaveBeenCalled();
                expect(mockNavigate).not.toHaveBeenCalled();
            });

            it('Then should not scroll', () => {
                init('#');
                directive.onClick(mockEvent());
                expect(mockScrollTo).not.toHaveBeenCalled();
            });
        });

        describe('When href is null', () => {
            it('Then should emit dsvLink and not navigate', () => {
                init(null);
                const emitSpy = vi.spyOn(directive.dsvLink, 'emit');
                directive.onClick(mockEvent());
                expect(emitSpy).toHaveBeenCalled();
                expect(mockNavigate).not.toHaveBeenCalled();
            });

            it('Then should not scroll', () => {
                init(null);
                directive.onClick(mockEvent());
                expect(mockScrollTo).not.toHaveBeenCalled();
            });
        });
    });
});
