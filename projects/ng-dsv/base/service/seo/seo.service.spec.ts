import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SeoService } from './seo.service';

describe('BaseSearchService', () => {
    let service: SeoService;
    let apiServiceMock: any;

    beforeEach(() => {
        apiServiceMock = {
            get: vi.fn(),
            platformService: {
                isPlatformBrowser: () => true,
            },
        };

        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                SeoService,
                { provide: ApiService, useValue: apiServiceMock },
                { provide: PlatformService, useValue: {} },
            ],
        });

        service = TestBed.inject(SeoService);
    });

    it('should initialize with default values', () => {
        service.setMeta('App', 'Title', 'Description');
        expect(service.title).toBeTruthy();
        expect(service.meta).toBeTruthy();
        expect(service.isPlatformBrowser()).toBe(true);
    });
});
