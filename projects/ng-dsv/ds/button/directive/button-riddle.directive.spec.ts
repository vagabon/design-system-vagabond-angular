import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ButtonRippleDirective } from './button-riddle.directive';

@Component({
    template: `<button buttonRipple [rippleColor]="color" [rippleDuration]="duration">Click</button>`,
    imports: [ButtonRippleDirective],
})
class TestHostComponent {
    color = 'rgba(255, 255, 255, 0.35)';
    duration = 550;
}

const createPlatformServiceMock = (isBrowser = true) => ({
    isPlatformBrowser: vi.fn().mockReturnValue(isBrowser),
});

const getButton = (): HTMLButtonElement =>
    TestBed.inject({ token: Document } as never, document).querySelector('button')!;

describe('ButtonRippleDirective', () => {
    describe('when platform is browser', () => {
        let platformServiceMock: ReturnType<typeof createPlatformServiceMock>;

        beforeEach(async () => {
            platformServiceMock = createPlatformServiceMock(true);

            await TestBed.configureTestingModule({
                imports: [TestHostComponent],
                providers: [{ provide: PlatformService, useValue: platformServiceMock }],
            }).compileComponents();

            TestBed.createComponent(TestHostComponent).detectChanges();
        });
        it('when initialized, sets overflow to hidden on host', () => {
            const button = getButton();
            expect(button.style.overflow).toBe('hidden');
        });

        it('when clicked, appends a ripple span to the host', () => {
            const button = getButton();
            button.dispatchEvent(new MouseEvent('click', { clientX: 10, clientY: 10, bubbles: true }));
            expect(button.querySelector('span.ripple')).toBeTruthy();
        });

        it('when clicked, ripple span has correct positional styles', () => {
            const button = getButton();
            vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
                width: 100,
                height: 50,
                left: 0,
                top: 0,
                right: 100,
                bottom: 50,
                x: 0,
                y: 0,
                toJSON: () => ({}),
            });

            button.dispatchEvent(new MouseEvent('click', { clientX: 20, clientY: 10, bubbles: true }));

            const ripple = button.querySelector<HTMLElement>('span.ripple')!;
            expect(ripple.style.position).toBe('absolute');
        });

        it('when clicked, ripple size equals the largest dimension of the host', () => {
            const button = getButton();
            vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
                width: 200,
                height: 80,
                left: 0,
                top: 0,
                right: 200,
                bottom: 80,
                x: 0,
                y: 0,
                toJSON: () => ({}),
            });

            button.dispatchEvent(new MouseEvent('click', { clientX: 0, clientY: 0, bubbles: true }));

            const ripple = button.querySelector<HTMLElement>('span.ripple')!;
            expect(ripple.style.width).toBe('200px');
            expect(ripple.style.height).toBe('200px');
        });

        it('when clicked, ripple uses the rippleColor input as background', () => {
            const button = getButton();
            vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
                width: 100,
                height: 100,
                left: 0,
                top: 0,
                right: 100,
                bottom: 100,
                x: 0,
                y: 0,
                toJSON: () => ({}),
            });

            button.dispatchEvent(new MouseEvent('click', { clientX: 0, clientY: 0, bubbles: true }));

            const ripple = button.querySelector<HTMLElement>('span.ripple')!;
            expect(ripple.style.background).toBe('rgba(255, 255, 255, 0.35)');
        });

        it('when clicked, ripple animation uses the rippleDuration input', () => {
            const button = getButton();
            vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
                width: 100,
                height: 100,
                left: 0,
                top: 0,
                right: 100,
                bottom: 100,
                x: 0,
                y: 0,
                toJSON: () => ({}),
            });

            button.dispatchEvent(new MouseEvent('click', { clientX: 0, clientY: 0, bubbles: true }));

            const ripple = button.querySelector<HTMLElement>('span.ripple')!;
            expect(ripple.style.animation).toContain('550ms');
        });

        it('when ripple animation ends, removes ripple span from the host', () => {
            const button = getButton();
            vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
                width: 100,
                height: 100,
                left: 0,
                top: 0,
                right: 100,
                bottom: 100,
                x: 0,
                y: 0,
                toJSON: () => ({}),
            });

            button.dispatchEvent(new MouseEvent('click', { clientX: 0, clientY: 0, bubbles: true }));

            const ripple = button.querySelector<HTMLElement>('span.ripple')!;
            ripple.dispatchEvent(new Event('animationend'));

            expect(button.querySelector('span.ripple')).toBeNull();
        });
    });

    describe('when platform is not browser', () => {
        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestHostComponent],
                providers: [{ provide: PlatformService, useValue: createPlatformServiceMock(false) }],
            }).compileComponents();

            TestBed.createComponent(TestHostComponent).detectChanges();
        });

        it('when not in browser, does not set overflow hidden on host', () => {
            const button = getButton();
            expect(button.style.overflow).toBe('');
        });

        it('when not in browser, does not override position on host', () => {
            const button = getButton();
            expect(button.style.position).toBe('');
        });
    });
});
