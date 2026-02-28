import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';
import { ThemeService } from './dsv.theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let storageServiceMock: jest.Mocked<StorageService>;
  let platformServiceMock: jest.Mocked<PlatformService>;

  beforeEach(async () => {
    storageServiceMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    } as unknown as jest.Mocked<StorageService>;

    platformServiceMock = {
      isPlatformBrowser: jest.fn(),
    } as unknown as jest.Mocked<PlatformService>;

    platformServiceMock.isPlatformBrowser.mockReturnValue(true);
    storageServiceMock.getItem.mockReturnValue('dark');

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        ThemeService,
        { provide: StorageService, useValue: storageServiceMock },
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