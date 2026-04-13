import { Injectable, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BaseSearchService } from './base.search.service';

@Injectable()
class TestSearchService extends BaseSearchService<any> { }

describe('BaseSearchService', () => {
    let service: TestSearchService;
    let apiServiceMock: any;

    beforeEach(() => {
        apiServiceMock = {
            get: vi.fn(),
        };

        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                TestSearchService,
                { provide: ApiService, useValue: apiServiceMock },
                { provide: PlatformService, useValue: {} },
            ],
        });

        service = TestBed.inject(TestSearchService);
    });

    it('should initialize with default values', () => {
        expect(service.page()).toBe(1);
        expect(service.search()).toBe('');
        expect(service.isLoading()).toBe(false);
        expect(service.stopLoad()).toBe(false);
    });

    it('should call apiService.get with correct URL for default load', () => {
        apiServiceMock.get.mockImplementation((_url: string, callback: any) => {
            callback({ content: [] });
        });

        service.doLoad();

        expect(apiServiceMock.get).toHaveBeenCalled();
        expect(service.isLoading()).toBe(false);
    });

    it('should set search and update page after load', () => {
        apiServiceMock.get.mockImplementation((_url: string, callback: any) => {
            callback({ content: [{ id: 1 }] });
        });

        service.doLoad('batman', 1);

        expect(service.search()).toBe('batman');
        expect(service.page()).toBeGreaterThan(1);
        expect(service.isLoading()).toBe(false);
    });

    it('should stop loading when content are empty', () => {
        apiServiceMock.get.mockImplementation((_url: string, callback: any) => {
            callback({ content: [] });
        });

        service.doLoad('search', 1);

        expect(service.stopLoad()).toBe(true);
    });

    it('should not call api if stopLoad is true', () => {
        service.stopLoad.set(true);

        service.doLoad('test', 2);

        expect(apiServiceMock.get).not.toHaveBeenCalled();
    });

    it('should update store when content are returned', () => {
        apiServiceMock.get.mockImplementation((_url: string, callback: any) => {
            callback({ content: [{ id: 1 }, { id: 2 }] });
        });

        service.doLoad('', 1);

        const data = service.datas.data();
        expect(data.length).toBe(2);
    });
});