import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: { get: ReturnType<typeof vi.fn>; post: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    httpClientSpy = {
      get: vi.fn(),
      post: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        ApiService,
        { provide: HttpClient, useValue: httpClientSpy },
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
      httpClientSpy.get.mockReturnValue(of(responseData));

      const callback = vi.fn();
      vi.spyOn(service, 'info').mockImplementation(() => { });

      service.get('test', callback);

      expect(httpClientSpy.get).toHaveBeenCalledWith('/api/test');
      expect(callback).toHaveBeenCalledWith(responseData);
    });

    it('should call error on failure', () => {
      const error = { error: 'failure' };
      httpClientSpy.get.mockReturnValue(throwError(() => error));

      vi.spyOn(service, 'error').mockImplementation(() => { });
      const callback = vi.fn();

      service.get('fail', callback);

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('post()', () => {
    it('should call HttpClient.post and callback with response', () => {
      const postData = { name: 'test' };
      const response = { status: 'ok' };

      httpClientSpy.post.mockReturnValue(of(response));
      const callback = vi.fn();
      vi.spyOn(service, 'info').mockImplementation(() => { });

      service.post('create', postData, callback);

      expect(httpClientSpy.post).toHaveBeenCalledWith('/api/create', postData);
      expect(callback).toHaveBeenCalledWith(response);
    });

    it('should handle post errors', () => {
      const postData = { name: 'error' };
      const error = { error: 'bad request' };

      httpClientSpy.post.mockReturnValue(throwError(() => error));
      vi.spyOn(service, 'error').mockImplementation(() => { });
      const callback = vi.fn();

      service.post('fail', postData, callback);

      expect(callback).not.toHaveBeenCalled();
    });
  });
});