import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';
import { ThemeService } from './dsv.theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let storageServiceMock: jasmine.SpyObj<StorageService>;
  let platformServiceMock: jasmine.SpyObj<PlatformService>;

  beforeEach(async () => {
    storageServiceMock = jasmine.createSpyObj('StorageService', ['getItem', 'setItem']);
    platformServiceMock = jasmine.createSpyObj('PlatformService', ['isPlatformBrowser']);

    platformServiceMock.isPlatformBrowser.and.returnValue(true);

    storageServiceMock.getItem.and.returnValue('dark');

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        ThemeService,
        { provide: StorageService, useValue: storageServiceMock }
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