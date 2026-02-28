import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PlatformService } from './platform.service';

describe('PlatformService', () => {
    let service: PlatformService;
    let platformId: any;

    beforeEach(() => {
        platformId = 'browser';

        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                PlatformService,
                { provide: PLATFORM_ID, useValue: platformId },
            ],
        });

        service = TestBed.inject(PlatformService);

        vi.spyOn(service, 'isPlatformBrowser');
    });

    it('should detect platform browser', () => {
        expect(service.isPlatformBrowser()).toBe(true);
    });
});