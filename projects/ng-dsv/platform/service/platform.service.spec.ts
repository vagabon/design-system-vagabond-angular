import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PlatformService } from './platform.service';

describe('PlatformService', () => {
    const setupService = (platformId: string, innerWidth: number) => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: innerWidth,
        });
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            providers: [{ provide: PLATFORM_ID, useValue: platformId }],
        });
        return TestBed.inject(PlatformService);
    };

    describe('when platform is browser and width is 500', () => {
        it('then isMobile=true, isTablet=false, isDesktop=false, isPlatformBrowser=true', () => {
            const service = setupService('browser', 500);
            expect(service.isPlatformBrowser()).toBe(true);
            expect(service.isMobile()).toBe(true);
            expect(service.isTablet()).toBe(false);
            expect(service.isDesktop()).toBe(false);
        });
    });

    describe('when platform is browser and width is 900', () => {
        it('then isMobile=false, isTablet=true, isDesktop=false', () => {
            const service = setupService('browser', 900);
            expect(service.isMobile()).toBe(false);
            expect(service.isTablet()).toBe(true);
            expect(service.isDesktop()).toBe(false);
        });
    });

    describe('when platform is browser and width is 1280', () => {
        it('then isMobile=false, isTablet=false, isDesktop=true', () => {
            const service = setupService('browser', 1280);
            expect(service.isMobile()).toBe(false);
            expect(service.isTablet()).toBe(false);
            expect(service.isDesktop()).toBe(true);
        });
    });

    describe('when platform is server', () => {
        it('then defaults to 1024, isMobile=false, isTablet=false, isDesktop=true, isPlatformBrowser=false', () => {
            const service = setupService('server', 0);
            expect(service.isPlatformBrowser()).toBe(false);
            expect(service.isMobile()).toBe(false);
            expect(service.isTablet()).toBe(false);
            expect(service.isDesktop()).toBe(true);
        });
    });

    describe('when a resize event is fired in browser', () => {
        it('then width signal updates and computed signals reflect the new value', () => {
            const service = setupService('browser', 1280);
            expect(service.isDesktop()).toBe(true);

            Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 400 });
            window.dispatchEvent(new Event('resize'));

            expect(service.isMobile()).toBe(true);
            expect(service.isTablet()).toBe(false);
            expect(service.isDesktop()).toBe(false);
        });
    });

    describe('when width is exactly at boundaries', () => {
        it('then 768 is tablet, 1024 is desktop, 767 is mobile', () => {
            const s768 = setupService('browser', 768);
            expect(s768.isMobile()).toBe(false);
            expect(s768.isTablet()).toBe(true);

            const s1024 = setupService('browser', 1024);
            expect(s1024.isTablet()).toBe(false);
            expect(s1024.isDesktop()).toBe(true);

            const s767 = setupService('browser', 767);
            expect(s767.isMobile()).toBe(true);
        });
    });
});
