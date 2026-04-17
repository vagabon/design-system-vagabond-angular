import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeService } from './dsv.theme.service';

describe('ThemeService', () => {
    let service: ThemeService;
    let storageServiceMock: { getItem: ReturnType<typeof vi.fn>; setItem: ReturnType<typeof vi.fn> };
    let platformServiceMock: { isPlatformBrowser: ReturnType<typeof vi.fn> };

    beforeEach(async () => {
        storageServiceMock = {
            getItem: vi.fn(),
            setItem: vi.fn(),
        };

        platformServiceMock = {
            isPlatformBrowser: vi.fn(),
        };

        platformServiceMock.isPlatformBrowser.mockReturnValue(true);
        storageServiceMock.getItem.mockReturnValue('dark');

        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                ThemeService,
                { provide: StorageService, useValue: storageServiceMock },
                { provide: PlatformService, useValue: platformServiceMock },
            ],
        });

        service = TestBed.inject(ThemeService);
    });

    it('should create service and set initial theme from storage', () => {
        expect(service).toBeTruthy();
        expect(service.themeMode()).toBe('dark');
    });

    it('should switch theme from dark to light', () => {
        service.switchTheme();

        expect(service.themeMode()).toBe('light');
        expect(storageServiceMock.setItem).toHaveBeenCalledWith('theme', 'light');
    });
});
