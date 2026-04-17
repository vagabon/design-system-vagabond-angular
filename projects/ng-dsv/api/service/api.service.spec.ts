import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { of, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiService } from './api.service';

describe('ApiService', () => {
    let service: ApiService;
    let httpClientMock: HttpClient & { get: any; post: any; put: any; delete: any };
    let toastServiceMock: ToastService;
    let platformServiceMock: PlatformService;

    beforeEach(() => {
        httpClientMock = {
            get: vi.fn(),
            post: vi.fn(),
            put: vi.fn(),
            delete: vi.fn(),
        } as unknown as HttpClient & { get: any; post: any; put: any; delete: any };

        toastServiceMock = {
            showToast: vi.fn(),
        } as unknown as ToastService;

        platformServiceMock = {
            isPlatformBrowser: vi.fn().mockReturnValue(true),
        } as unknown as PlatformService;

        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                ApiService,
                { provide: HttpClient, useValue: httpClientMock },
                { provide: ToastService, useValue: toastServiceMock },
                { provide: PlatformService, useValue: platformServiceMock },
            ],
        });

        service = TestBed.inject(ApiService);
        service.setBaseUrl('/api');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('get() should call callback on success', () => {
        const mockData = { id: 1, name: 'test' };
        httpClientMock.get.mockReturnValue(of(mockData));
        const callback = vi.fn();

        service.get('/test', callback);

        expect(callback).toHaveBeenCalledWith(mockData);
        expect(service.load()).toBe(false);
    });

    it('post() should call callback on success', () => {
        const mockData = { id: 1 };
        httpClientMock.post.mockReturnValue(of(mockData));
        const callback = vi.fn();

        service.post('/create', mockData, callback);

        expect(callback).toHaveBeenCalledWith(mockData);
        expect(service.load()).toBe(false);
    });

    it('put() should call callback on success', () => {
        const mockData = { id: 2 };
        httpClientMock.put.mockReturnValue(of(mockData));
        const callback = vi.fn();

        service.put('/update', mockData, callback);

        expect(callback).toHaveBeenCalledWith(mockData);
        expect(service.load()).toBe(false);
    });

    it('delete() should call callback on success', () => {
        const mockData = { success: true };
        httpClientMock.delete.mockReturnValue(of(mockData));
        const callback = vi.fn();

        service.delete('/delete', callback);

        expect(callback).toHaveBeenCalledWith(mockData);
        expect(service.load()).toBe(false);
    });

    it('should handle error in get()', () => {
        const error = { message: 'fail' };
        httpClientMock.get.mockReturnValue(throwError(() => error));
        const callback = vi.fn();
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        service.get('/fail', callback);

        expect(callback).not.toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });

    it('createOrUpdate() should call put for existing entity', () => {
        const data = { id: 10, name: 'update' };
        httpClientMock.put.mockReturnValue(of(data));
        const callback = vi.fn();

        service.createOrUpdate('entity', data, callback);

        expect(toastServiceMock.showToast).toHaveBeenCalledWith({ text: 'UPDATE_OK', type: 'success' });
        expect(callback).toHaveBeenCalledWith(data);
    });

    it('createOrUpdate() should call post for new entity', () => {
        const data = { id: null, name: 'new' };
        httpClientMock.post.mockReturnValue(of(data));
        const callback = vi.fn();

        service.createOrUpdate('entity', data, callback);

        expect(toastServiceMock.showToast).toHaveBeenCalledWith({ text: 'CREATION_OK', type: 'success' });
        expect(callback).toHaveBeenCalledWith(data);
    });
});
