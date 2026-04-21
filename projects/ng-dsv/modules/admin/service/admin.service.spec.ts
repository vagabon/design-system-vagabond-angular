import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { provideTranslateService } from '@ngx-translate/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminService } from './admin.service';

describe('AdminService', () => {
    let service: AdminService;
    let apiServiceSpy: { get: ReturnType<typeof vi.fn>; put: ReturnType<typeof vi.fn> };

    beforeEach(() => {
        apiServiceSpy = {
            get: vi.fn(),
            put: vi.fn(),
        };

        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                provideTranslateService(),
                AdminService,
                { provide: ApiService, useValue: apiServiceSpy },
            ],
        });

        service = TestBed.inject(AdminService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call get() and set datas signal', () => {
        const responseMock = { content: [{ id: 1, name: 'test' }], total: 1 } as any;
        apiServiceSpy.get.mockImplementation((url: string, cb: Function) => cb(responseMock));

        service.get('admin', 'name', 'test');

        expect(apiServiceSpy.get).toHaveBeenCalledWith(
            '/admin/findBy?fields=name&values=test&first=0&max=10',
            expect.any(Function),
        );
    });

    it('should call put() and set data signal', () => {
        const payload = { id: 1, name: 'Updated' };
        const responseMock = { ...payload };
        apiServiceSpy.put.mockImplementation((url: string, data: any, cb: Function) => cb(responseMock));

        service.put('admin', payload as any);

        expect(apiServiceSpy.put).toHaveBeenCalledWith('/admin', payload, expect.any(Function));
        expect(service.data()).toEqual(responseMock);
    });

    it('should call findById() and set data signal', () => {
        const responseMock = { id: 2, name: 'User' };
        apiServiceSpy.get.mockImplementation((url: string, cb: Function) => cb(responseMock));

        service.findById('admin', '2');

        expect(apiServiceSpy.get).toHaveBeenCalledWith('/admin/2', expect.any(Function));
        expect(service.data()).toEqual(responseMock);
    });

    it('should call get() with a custom callback if provided', () => {
        const callback = vi.fn();
        const mockData = { content: [], total: 0 };

        apiServiceSpy.get.mockImplementation((url: string, cb: Function) => cb(mockData));

        service.get('admin', 'email', 'john', 1, 5, callback);

        expect(callback).toHaveBeenCalledWith(mockData);
    });
});
