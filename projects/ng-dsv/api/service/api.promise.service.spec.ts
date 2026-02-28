import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { of, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiPromiseService } from './api.promise.service';

describe('ApiPromiseService', () => {
    let service: ApiPromiseService;
    let httpClientMock: any;
    let toastServiceMock: any;
    let platformServiceMock: any;

    beforeEach(() => {
        httpClientMock = {
            get: vi.fn(),
            post: vi.fn(),
            put: vi.fn(),
            delete: vi.fn(),
        };

        toastServiceMock = {
            showToast: vi.fn(),
        };

        platformServiceMock = {
            isPlatformBrowser: vi.fn().mockReturnValue(true),
        };

        TestBed.configureTestingModule({
            providers: [
                ApiPromiseService,
                { provide: HttpClient, useValue: httpClientMock },
                { provide: ToastService, useValue: toastServiceMock },
                { provide: PlatformService, useValue: platformServiceMock },
            ],
        });

        service = TestBed.inject(ApiPromiseService);
        service.setBaseUrl('/api');
    });

    it('should create service', () => {
        expect(service).toBeTruthy();
    });

    it('get() should call HttpClient.get and resolve data', async () => {
        const mockData = { id: 1 };
        httpClientMock.get.mockReturnValue(of(mockData));

        const result = await service.get('/test');
        expect(result).toEqual(mockData);
        expect(httpClientMock.get).toHaveBeenCalledWith('/api/test');
    });

    it('post() should call HttpClient.post and resolve data', async () => {
        const payload = { name: 'test' };
        httpClientMock.post.mockReturnValue(of(payload));

        const result = await service.post('/create', payload);
        expect(result).toEqual(payload);
        expect(httpClientMock.post).toHaveBeenCalledWith('/api/create', payload);
    });

    it('put() should call HttpClient.put and resolve data', async () => {
        const payload = { id: 1, name: 'update' };
        httpClientMock.put.mockReturnValue(of(payload));

        const result = await service.put('/update', payload);
        expect(result).toEqual(payload);
        expect(httpClientMock.put).toHaveBeenCalledWith('/api/update', payload);
    });

    it('delete() should call HttpClient.delete and resolve data', async () => {
        const mockData = { deleted: true };
        httpClientMock.delete.mockReturnValue(of(mockData));

        const result = await service.delete('/delete');
        expect(result).toEqual(mockData);
        expect(httpClientMock.delete).toHaveBeenCalledWith('/api/delete');
    });

    it('createOrUpdate() should call post when id is not set', async () => {
        const payload = { id: null, name: 'new' };
        httpClientMock.post.mockReturnValue(of(payload));

        const result = await service.createOrUpdate('/endpoint', payload);
        expect(result).toEqual(payload);
        expect(toastServiceMock.showToast).toHaveBeenCalledWith({ text: 'CREATION_OK', type: 'success' });
        expect(httpClientMock.post).toHaveBeenCalledWith('/api/endpoint/', payload);
    });

    it('createOrUpdate() should call put when id is set', async () => {
        const payload = { id: 1, name: 'update' };
        httpClientMock.put.mockReturnValue(of(payload));

        const result = await service.createOrUpdate('/endpoint', payload);
        expect(result).toEqual(payload);
        expect(toastServiceMock.showToast).toHaveBeenCalledWith({ text: 'UPDATE_OK', type: 'success' });
        expect(httpClientMock.put).toHaveBeenCalledWith('/api/endpoint/', payload);
    });

    it('should handle errors in get', async () => {
        httpClientMock.get.mockReturnValue(throwError(() => 'fail'));

        await expect(service.get('/fail')).rejects.toThrow('fail');
    });

    it('should handle errors in post', async () => {
        httpClientMock.post.mockReturnValue(throwError(() => 'fail'));

        await expect(service.post('/fail', {})).rejects.toThrow('fail');
    });

    it('should handle errors in put', async () => {
        httpClientMock.put.mockReturnValue(throwError(() => 'fail'));

        await expect(service.put('/fail', {})).rejects.toThrow('fail');
    });

    it('should handle errors in delete', async () => {
        httpClientMock.delete.mockReturnValue(throwError(() => 'fail'));

        await expect(service.delete('/fail')).rejects.toThrow('fail');
    });
});