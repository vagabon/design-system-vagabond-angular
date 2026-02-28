import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
    let service: StorageService;
    let platformId: any;

    beforeEach(() => {
        platformId = 'browser';

        // Mock localStorage avant de configurer TestBed
        Storage.prototype.setItem = jest.fn();
        Storage.prototype.getItem = jest.fn(() => null);
        Storage.prototype.removeItem = jest.fn();
        Storage.prototype.clear = jest.fn();

        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                StorageService,
                { provide: PLATFORM_ID, useValue: platformId },
            ],
        });

        service = TestBed.inject(StorageService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('setItem calls localStorage.setItem when platform is browser', () => {
        service.setItem('key', { a: 1 });
        expect(localStorage.setItem).toHaveBeenCalledWith('key', JSON.stringify({ a: 1 }));
    });

    it('getItem calls localStorage.getItem and parses result', () => {
        const storedValue = JSON.stringify({ x: 10 });
        (localStorage.getItem as jest.Mock).mockReturnValueOnce(storedValue);

        const result = service.getItem<{ x: number }>('key');
        expect(localStorage.getItem).toHaveBeenCalledWith('key');
        expect(result).toEqual({ x: 10 });
    });

    it('getItem returns null if localStorage.getItem returns null', () => {
        (localStorage.getItem as jest.Mock).mockReturnValueOnce(null);

        const result = service.getItem('key');
        expect(result).toBeNull();
    });

    it('parse returns original string if JSON.parse fails', () => {
        const invalidJson = '{ bad json }';
        expect(service.parse(invalidJson)).toBe(invalidJson);
    });

    it('removeItem calls localStorage.removeItem when platform is browser', () => {
        service.removeItem('key');
        expect(localStorage.removeItem).toHaveBeenCalledWith('key');
    });

    it('clear calls localStorage.clear when platform is browser', () => {
        service.clear();
        expect(localStorage.clear).toHaveBeenCalled();
    });
});