import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ApiLoadService } from './api.load.service';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let apiLoadServiceMock: jasmine.SpyObj<ApiLoadService>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    apiLoadServiceMock = {
      load: {
        set: jasmine.createSpy('set'),
      },
    } as any;

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        ApiService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: ApiLoadService, useValue: apiLoadServiceMock },
      ],
    });

    service = TestBed.inject(ApiService);
    service.setBaseUrl('/api/');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get()', () => {
    it('should call HttpClient.get and callback with data', () => {
      const responseData = { message: 'success' };
      httpClientSpy.get.and.returnValue(of(responseData));

      const callback = jasmine.createSpy('callback');
      spyOn(service, 'info');

      service.get('test', callback);

      expect(apiLoadServiceMock.load.set).toHaveBeenCalledWith(true);
      expect(httpClientSpy.get).toHaveBeenCalledWith('/api/test');
      expect(apiLoadServiceMock.load.set).toHaveBeenCalledWith(false);
      expect(callback).toHaveBeenCalledWith(responseData);
    });

    it('should call error on failure', () => {
      const error = { error: 'failure' };
      httpClientSpy.get.and.returnValue(throwError(() => error));

      spyOn(service, 'error');
      const callback = jasmine.createSpy('callback');

      service.get('fail', callback);

      expect(apiLoadServiceMock.load.set).toHaveBeenCalledWith(true);
      expect(apiLoadServiceMock.load.set).toHaveBeenCalledWith(false);
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('post()', () => {
    it('should call HttpClient.post and callback with response', () => {
      const postData = { name: 'test' };
      const response = { status: 'ok' };

      httpClientSpy.post.and.returnValue(of(response));
      const callback = jasmine.createSpy('callback');
      spyOn(service, 'info');

      service.post('create', postData, callback);

      expect(apiLoadServiceMock.load.set).toHaveBeenCalledWith(true);
      expect(httpClientSpy.post).toHaveBeenCalledWith('/api/create', postData);
      expect(apiLoadServiceMock.load.set).toHaveBeenCalledWith(false);
      expect(callback).toHaveBeenCalledWith(response);
    });

    it('should handle post errors', () => {
      const postData = { name: 'error' };
      const error = { error: 'bad request' };

      httpClientSpy.post.and.returnValue(throwError(() => error));
      spyOn(service, 'error');
      const callback = jasmine.createSpy('callback');

      service.post('fail', postData, callback);

      expect(apiLoadServiceMock.load.set).toHaveBeenCalledWith(true);
      expect(apiLoadServiceMock.load.set).toHaveBeenCalledWith(false);
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
