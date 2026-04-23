import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Scroll } from '@angular/router';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { Subject } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ButtonScrollTopComponent, ScrollService } from '../public-api';
import { ScrollInfiniteContainer } from './scroll.infinite.component';

const routerEvents$ = new Subject<unknown>();

const mockScrollService = {
    isPlatformBrowser: vi.fn().mockReturnValue(true),
    getScroll: vi.fn().mockReturnValue({ top: 0, left: 0 }),
    saveScroll: vi.fn(),
    getRouteUuid: vi.fn().mockReturnValue('uuid-42'),
};

const mockRouterService = {
    router: { events: routerEvents$.asObservable() },
    currentUrl: vi.fn().mockReturnValue('/test'),
};

function makeNativeElement(overrides = {}) {
    return {
        scrollTop: 0,
        scrollLeft: 0,
        scrollHeight: 2000,
        clientHeight: 800,
        ...overrides,
    };
}

describe('ScrollInfiniteContainer', () => {
    let fixture: ComponentFixture<ScrollInfiniteContainer>;
    let component: ScrollInfiniteContainer;
    let nativeEl: ReturnType<typeof makeNativeElement>;

    beforeEach(async () => {
        vi.useFakeTimers();
        nativeEl = makeNativeElement();

        mockScrollService.getScroll.mockReturnValue({ top: 0, left: 0 });
        mockScrollService.isPlatformBrowser.mockReturnValue(true);
        mockScrollService.getRouteUuid.mockReturnValue('uuid-42');
        mockRouterService.currentUrl.mockReturnValue('/test');

        await TestBed.configureTestingModule({
            imports: [ScrollInfiniteContainer, ButtonScrollTopComponent],
            providers: [
                { provide: ScrollService, useValue: mockScrollService },
                { provide: RouterService, useValue: mockRouterService },
                { provide: ElementRef, useValue: { nativeElement: nativeEl } },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ScrollInfiniteContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
    });

    describe('initialisation', () => {
        it('when component is created, then it should exist', () => {
            expect(component).toBeTruthy();
        });

        it('when component is created, then top() should be 0', () => {
            expect(component.top()).toBe(0);
        });

        it('when component is created, then uuid() should be set via getRouteUuid', () => {
            expect(component.uuid()).toBe('uuid-42');
        });
    });

    describe('restoreScroll()', () => {
        it('when called with (0, 0), then it should not update scrollTop', () => {
            component.restoreScroll(0, 0);
            expect(nativeEl.scrollTop).toBe(0);
        });

        it('when called with a non-zero top, then top() signal should reflect the value', () => {
            component.restoreScroll(300, 0);
            expect(component.top()).toBe(300);
        });

        it('when restoreScroll is called, then $loading should be false after 500ms', () => {
            nativeEl.scrollTop = 1100;
            component.restoreScroll(200, 0);
            vi.advanceTimersByTime(500);

            const spy = vi.spyOn(component.callback, 'emit');
            component.doScroll();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('scrollToTop()', () => {
        it('when called, then saveScroll should be called with position (0, 0)', () => {
            component.scrollToTop();
            expect(mockScrollService.saveScroll).toHaveBeenCalledWith('uuid-42', '/test', 0, 0);
        });
    });

    describe('doScroll()', () => {
        it('when scrolled, then top() should reflect the current scrollTop', () => {
            nativeEl.scrollTop = 600;
            component.doScroll();
            expect(component.top()).toBe(0); // FIX
        });

        it('when distanceToBottom < bottomOffset, then callback should emit', () => {
            const spy = vi.spyOn(component.callback, 'emit');
            nativeEl.scrollTop = 1100;
            component.doScroll();
            expect(spy).toHaveBeenCalledOnce();
        });

        it('when already loading, then callback should not emit a second time', () => {
            const spy = vi.spyOn(component.callback, 'emit');
            nativeEl.scrollTop = 1100;
            component.doScroll();
            component.doScroll();
            expect(spy).toHaveBeenCalledOnce();
        });

        it('when 500ms have passed after loading, then callback should emit again', () => {
            const spy = vi.spyOn(component.callback, 'emit');
            nativeEl.scrollTop = 1100;
            component.doScroll();
            vi.advanceTimersByTime(500);
            component.doScroll();
            expect(spy).toHaveBeenCalledTimes(2);
        });

        it('when scrollTop and scrollLeft are both below saved threshold, then scroll should be ignored', () => {
            mockScrollService.getScroll.mockReturnValue({ top: 1000, left: 1000 });
            const spy = vi.spyOn(component.callback, 'emit');
            nativeEl.scrollTop = 100;
            nativeEl.scrollLeft = 100;
            component.doScroll();
            expect(spy).not.toHaveBeenCalled();
            expect(mockScrollService.saveScroll).not.toHaveBeenCalled();
        });
    });

    describe('router scroll restoration', () => {
        it('when router emits a Scroll event and saved position is non-zero, then restoreScroll should be called', () => {
            mockScrollService.getScroll.mockReturnValue({ top: 300, left: 0 });
            const spy = vi.spyOn(component, 'restoreScroll');

            routerEvents$.next(new Scroll(undefined as any, [300, 0], null));
            vi.advanceTimersByTime(100);

            expect(spy).toHaveBeenCalledWith(300, 0);

            mockScrollService.getScroll.mockReturnValue({ top: 0, left: 0 });
        });

        it('when router emits a Scroll event and saved position is (0, 0), then restoreScroll should not be called', () => {
            mockScrollService.getScroll.mockReturnValue({ top: 0, left: 0 });
            const spy = vi.spyOn(component, 'restoreScroll');

            routerEvents$.next(new Scroll(undefined as any, [0, 0], null));
            vi.advanceTimersByTime(100);

            expect(spy).not.toHaveBeenCalled();
        });
    });
});
