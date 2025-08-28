import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { OrderState } from '../dto/api.dto';
import { ApiLoadService } from './api.load.service';
import { ApiPromiseService } from './api.promise.service';

import { of, throwError } from 'rxjs';

describe('ApiPromiseService', () => {
    let service: ApiPromiseService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let toastServiceSpy: jasmine.SpyObj<ToastService>;
    let platformServiceSpy: jasmine.SpyObj<PlatformService>;
    let apiLoadServiceSpy: jasmine.SpyObj<ApiLoadService>;

    beforeEach(() => {
        const httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
        const toastSpy = jasmine.createSpyObj('ToastService', ['showToast']);
        const platformSpy = jasmine.createSpyObj('PlatformService', ['isPlatformBrowser']);
        const apiLoadSpy = jasmine.createSpyObj('ApiLoadService', [], { load: { set: jasmine.createSpy() } });

        TestBed.configureTestingModule({
            providers: [
                ApiPromiseService,
                provideZonelessChangeDetection(),
                { provide: HttpClient, useValue: httpSpy },
                { provide: ToastService, useValue: toastSpy },
                { provide: PlatformService, useValue: platformSpy },
                { provide: ApiLoadService, useValue: apiLoadSpy },
            ],
        });

        service = TestBed.inject(ApiPromiseService);
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
        toastServiceSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
        platformServiceSpy = TestBed.inject(PlatformService) as jasmine.SpyObj<PlatformService>;
        apiLoadServiceSpy = TestBed.inject(ApiLoadService) as jasmine.SpyObj<ApiLoadService>;

        service.setBaseUrl('http://test.com/api/');
        platformServiceSpy.isPlatformBrowser.and.returnValue(true);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set base url', () => {
        service.setBaseUrl('http://newurl.com/api/');
        expect(service.baseUrl).toBe('http://newurl.com/api/');
    });

    it('should call GET and return data', async () => {
        const mockData = { id: 1, name: 'test' };
        httpClientSpy.get.and.returnValue(of(mockData));

        const data = await service.get<any>('users');
        expect(data).toEqual(mockData);
        expect(httpClientSpy.get).toHaveBeenCalledWith('http://test.com/api/users');
        expect(apiLoadServiceSpy.load.set).toHaveBeenCalledWith(true);
        expect(apiLoadServiceSpy.load.set).toHaveBeenCalledWith(false);
    });

    it('should call POST and return data', async () => {
        const mockData = { id: 1, name: 'test' };
        httpClientSpy.post.and.returnValue(of(mockData));

        const data = await service.post<any>('users', mockData);
        expect(data).toEqual(mockData);
        expect(httpClientSpy.post).toHaveBeenCalledWith('http://test.com/api/users', mockData);
    });

    it('should call PUT and return data', async () => {
        const mockData = { id: 1, name: 'test' };
        httpClientSpy.put.and.returnValue(of(mockData));

        const data = await service.put<any>('users', mockData);
        expect(data).toEqual(mockData);
        expect(httpClientSpy.put).toHaveBeenCalledWith('http://test.com/api/users', mockData);
    });

    it('should call DELETE and return data', async () => {
        const mockData = { id: 1, name: 'test' };
        httpClientSpy.delete.and.returnValue(of(mockData));

        const data = await service.delete<any>('users');
        expect(data).toEqual(mockData);
        expect(httpClientSpy.delete).toHaveBeenCalledWith('http://test.com/api/users');
    });

    it('should call findById', async () => {
        const mockData = { id: 1, name: 'test' };
        httpClientSpy.get.and.returnValue(of(mockData));

        await service.findById<any>('users', 1);
        expect(httpClientSpy.get).toHaveBeenCalledWith('http://test.com/api/users/1');
    });

    it('should call findBy with correct params', async () => {
        const mockData = { id: 1, name: 'test' };
        httpClientSpy.get.and.returnValue(of(mockData));
        const order: OrderState = { order: 'name', orderAsc: true };

        await service.findBy<any>('users', 'name', 'test', 0, 10, order);
        expect(httpClientSpy.get).toHaveBeenCalledWith(
            'http://test.com/api/users?fields=name%3E%3Ename&values=test&first=0&max=10'
        );
    });

    it('should call countBy with correct params', async () => {
        const mockData = { count: 1 };
        httpClientSpy.get.and.returnValue(of(mockData));

        await service.countBy('users', 'name', 'test');
        expect(httpClientSpy.get).toHaveBeenCalledWith(
            'http://test.com/api/users?fields=name&values=test'
        );
    });

    it('should call createOrUpdate with PUT for existing id', async () => {
        const mockData = { id: 1, name: 'test' };
        httpClientSpy.put.and.returnValue(of(mockData));

        const data = await service.createOrUpdate('users', mockData);
        expect(data).toEqual(mockData);
        expect(httpClientSpy.put).toHaveBeenCalledWith('http://test.com/api/users/', mockData);
        expect(toastServiceSpy.showToast).toHaveBeenCalledWith({ text: 'UPDATE_OK', type: 'success' });
    });

    it('should call createOrUpdate with POST for new id', async () => {
        const mockData = { id: null, name: 'test' };
        httpClientSpy.post.and.returnValue(of(mockData));

        const data = await service.createOrUpdate('users', mockData);
        expect(data).toEqual(mockData);
        expect(httpClientSpy.post).toHaveBeenCalledWith('http://test.com/api/users/', mockData);
        expect(toastServiceSpy.showToast).toHaveBeenCalledWith({ text: 'CREATION_OK', type: 'success' });
    });

    it('should handle error', async () => {
        const error = { message: 'Error' };
        httpClientSpy.get.and.returnValue(throwError(() => error));
        spyOn(console, 'error');

        try {
            await service.get<any>('users');
        } catch (e) {
            expect(apiLoadServiceSpy.load.set).toHaveBeenCalledWith(false);
            expect(console.error).toHaveBeenCalled();
        }
    });
});

