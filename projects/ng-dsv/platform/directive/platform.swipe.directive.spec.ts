import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PlatformSwipeDirective } from './platform.swipe.directive';

@Component({
    imports: [PlatformSwipeDirective],
    template: `
        <div
            appSwipe
            (swipeLeft)="onSwipeLeft()"
            (swipeRight)="onSwipeRight()"
            style="width: 200px; height: 200px;"
        ></div>
    `,
})
class TestHostComponent {
    onSwipeLeft = vi.fn();
    onSwipeRight = vi.fn();
}

describe('PlatformSwipeDirective', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let targetEl: HTMLElement;

    beforeEach(async () => {
        TestBed.resetTestingModule();

        await TestBed.configureTestingModule({
            imports: [TestHostComponent, PlatformSwipeDirective],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        targetEl = fixture.nativeElement.querySelector('div');
        fixture.detectChanges();
    });

    const createTouchEvent = (type: 'touchstart' | 'touchend', clientX: number, clientY: number) => {
        const touch = { clientX, clientY } as Touch;
        const event = new Event(type, { bubbles: true, cancelable: true }) as TouchEvent;

        Object.defineProperty(event, 'touches', { value: [touch], writable: false });
        Object.defineProperty(event, 'changedTouches', { value: [touch], writable: false });

        return event;
    };

    it("devrait émettre swipeRight lors d'un balayage vers la droite (deltaX >= 40px)", () => {
        targetEl.dispatchEvent(createTouchEvent('touchstart', 50, 100));
        targetEl.dispatchEvent(createTouchEvent('touchend', 100, 100));

        expect(hostComponent.onSwipeRight).toHaveBeenCalledOnce();
        expect(hostComponent.onSwipeLeft).not.toHaveBeenCalled();
    });

    it("devrait émettre swipeLeft lors d'un balayage vers la gauche (deltaX <= -40px)", () => {
        targetEl.dispatchEvent(createTouchEvent('touchstart', 100, 100));
        targetEl.dispatchEvent(createTouchEvent('touchend', 50, 100));

        expect(hostComponent.onSwipeLeft).toHaveBeenCalledOnce();
        expect(hostComponent.onSwipeRight).not.toHaveBeenCalled();
    });

    it('ne devrait rien émettre si le déplacement horizontal est inférieur au seuil (< 40px)', () => {
        targetEl.dispatchEvent(createTouchEvent('touchstart', 50, 100));
        targetEl.dispatchEvent(createTouchEvent('touchend', 80, 100));

        expect(hostComponent.onSwipeRight).not.toHaveBeenCalled();
        expect(hostComponent.onSwipeLeft).not.toHaveBeenCalled();
    });

    it('ne devrait rien émettre si le déplacement vertical dépasse maxVerticalDelta (> 50px)', () => {
        targetEl.dispatchEvent(createTouchEvent('touchstart', 50, 50));
        targetEl.dispatchEvent(createTouchEvent('touchend', 100, 120));

        expect(hostComponent.onSwipeRight).not.toHaveBeenCalled();
        expect(hostComponent.onSwipeLeft).not.toHaveBeenCalled();
    });
});
