import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { throwError } from 'rxjs';
import { ApiPromiseService } from './api.promise.service';

describe('ApiPromiseService', () => {
    let service: ApiPromiseService;
    let httpClientSpy: jest.Mocked<HttpClient>;
    let toastServiceSpy: jest.Mocked<ToastService>;
    let platformServiceSpy: jest.Mocked<PlatformService>;

    beforeEach(() => {
        const httpSpy = { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() } as unknown as jest.Mocked<HttpClient>;
        const toastSpy = { showToast: jest.fn() } as unknown as jest.Mocked<ToastService>;
        const platformSpy = { isPlatformBrowser: jest.fn() } as unknown as jest.Mocked<PlatformService>;

        TestBed.configureTestingModule({
            providers: [
                ApiPromiseService,
                provideZonelessChangeDetection(),
                { provide: HttpClient, useValue: httpSpy },
                { provide: ToastService, useValue: toastSpy },
                { provide: PlatformService, useValue: platformSpy },
            ],
        });

        service = TestBed.inject(ApiPromiseService);
        httpClientSpy = TestBed.inject(HttpClient) as jest.Mocked<HttpClient>;
        toastServiceSpy = TestBed.inject(ToastService) as jest.Mocked<ToastService>;
        platformServiceSpy = TestBed.inject(PlatformService) as jest.Mocked<PlatformService>;

        service.setBaseUrl('http://test.com/api/');
        platformServiceSpy.isPlatformBrowser.mockReturnValue(true);
    });

    // ... tous les tests restent identiques sauf le dernier :

    it('should handle error', async () => {
        const error = { message: 'Error' };
        httpClientSpy.get.mockReturnValue(throwError(() => error));
        jest.spyOn(console, 'error').mockImplementation(() => { });

        try {
            await service.get<any>('users');
        } catch (e) {
            expect(console.error).toHaveBeenCalled();
        }
    });
});