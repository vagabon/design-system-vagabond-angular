import { TestBed } from '@angular/core/testing';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StorageService } from './storage.service';

describe('StorageService', () => {
    let service: StorageService;
    let platformServiceMock: PlatformService;

    beforeEach(() => {
        platformServiceMock = {
            isPlatformBrowser: vi.fn().mockReturnValue(true),
        } as unknown as PlatformService;

        // Mock global localStorage
        const store: Record<string, string> = {};
        vi.stubGlobal('localStorage', {
            getItem: vi.fn((key: string) => store[key] ?? null),
            setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
            removeItem: vi.fn((key: string) => { delete store[key]; }),
            clear: vi.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
        });

        TestBed.configureTestingModule({
            providers: [
                StorageService,
                { provide: PlatformService, useValue: platformServiceMock },
            ],
        });

        service = TestBed.inject(StorageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set and get an item', () => {
        service.setItem('key', { foo: 'bar' });
        const value = service.getItem<{ foo: string }>('key');
        expect(value).toEqual({ foo: 'bar' });
    });

    it('should return null if item does not exist', () => {
        const value = service.getItem('nonexistent');
        expect(value).toBeNull();
    });

    it('should parse invalid JSON gracefully', () => {
        localStorage.setItem('bad', 'not-json');
        const spy = vi.spyOn(console, 'error').mockImplementation(() => { });
        const value = service.getItem('bad');
        expect(value).toBe('not-json');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    it('should remove an item', () => {
        service.setItem('keyToRemove', 'value');
        service.removeItem('keyToRemove');
        expect(service.getItem('keyToRemove')).toBeNull();
    });

    it('should clear all items', () => {
        service.setItem('a', 1);
        service.setItem('b', 2);
        service.clear();
        expect(service.getItem('a')).toBeNull();
        expect(service.getItem('b')).toBeNull();
    });

    it('should respect suffix', () => {
        service.suffixe.set('_suffix');
        service.setItem('key', 'value');
        expect(localStorage.setItem).toHaveBeenCalledWith('key_suffix', '"value"');
    });

    it('should not access localStorage if not browser', () => {
        service.setItem('key', 'value');
        expect(localStorage.setItem).toHaveBeenCalled();
    });
});