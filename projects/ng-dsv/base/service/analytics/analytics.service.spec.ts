import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
    let service: AnalyticsService;

    beforeEach(() => {
        vi.clearAllMocks();
        document.head.innerHTML = '';

        TestBed.configureTestingModule({
            providers: [AnalyticsService, { provide: PLATFORM_ID, useValue: 'browser' }],
        });

        service = TestBed.inject(AnalyticsService);
    });

    describe('Initialization', () => {
        it('when platform is browser and analyticsId is provided, then appends scripts to head', () => {
            service.init('G-123456');

            const scripts = document.head.querySelectorAll('script');
            expect(scripts.length).toBe(2);

            expect(scripts[0].src).toBe('https://www.googletagmanager.com/gtag/js?id=G-123456');
            expect(scripts[0].async).toBe(true);

            expect(scripts[1].innerHTML).toContain("gtag('config', 'G-123456');");
        });

        it('when analyticsId is undefined, then does not append scripts', () => {
            service.init(undefined);

            const scripts = document.head.querySelectorAll('script');
            expect(scripts.length).toBe(0);
        });

        it('when platform is server, then does not append scripts', () => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                providers: [AnalyticsService, { provide: PLATFORM_ID, useValue: 'server' }],
            });

            const serverService = TestBed.inject(AnalyticsService);
            serverService.init('G-123456');

            const scripts = document.head.querySelectorAll('script');
            expect(scripts.length).toBe(0);
        });
    });
});
