import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { RouterExternalPipe } from './router.external.pipe';

const setup = () => {
    TestBed.configureTestingModule({
        providers: [provideZonelessChangeDetection(), RouterExternalPipe],
    });
    return TestBed.inject(RouterExternalPipe);
};

describe('RouterExternalPipe', () => {
    it('should create', () => {
        expect(setup()).toBeTruthy();
    });

    describe('onClick', () => {
        it('When click is triggered, Then should stop propagation and emit dsvLinkExternal', () => {
            const directive = setup();
            const emitSpy = vi.spyOn(directive.dsvLinkExternal, 'emit');
            const event = { stopPropagation: vi.fn() } as unknown as Event;

            directive.onClick(event);

            expect(event.stopPropagation).toHaveBeenCalledOnce();
            expect(emitSpy).toHaveBeenCalledOnce();
        });
    });
});
