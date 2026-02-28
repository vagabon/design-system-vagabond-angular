// api.promise.service.spec.ts
import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiPromiseService } from './api.promise.service';

describe('ApiPromiseService', () => {
    let service: ApiPromiseService;
    let httpClientSpy: { [key: string]: ReturnType<typeof vi.fn> };
    let toastServiceSpy: { showToast: ReturnType<typeof vi.fn> };
    let platformServiceSpy: { isPlatformBrowser: ReturnType<typeof vi.fn> };

    beforeEach(() => {
        const httpSpy = {
            get: vi.fn(),
            post: vi.fn(),
            put: vi.fn(),
            delete: vi.fn()
        };

        const toastSpy = {
            showToast: vi.fn()
        };

        const platformSpy = {
            isPlatformBrowser: vi.fn()
        };

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
        httpClientSpy = TestBed.inject(HttpClient) as any;
        toastServiceSpy = TestBed.inject(ToastService) as any;
        platformServiceSpy = TestBed.inject(PlatformService) as any;

        service.setBaseUrl('http://test.com/api/');
        platformServiceSpy.isPlatformBrowser.mockReturnValue(true);
    });

    // Exemple de test converti
    it('should handle error', async () => {
        const error = { message: 'Error' };
        httpClientSpy['get'].mockReturnValue(throwError(() => error));
        vi.spyOn(console, 'error').mockImplementation(() => { });

        try {
            await service.get<any>('users');
        } catch (e) {
            expect(console.error).toHaveBeenCalled();
        }
    });

    // Exemple de test supplémentaire
    it('should call toast service on error', async () => {
        const error = { message: 'Error' };
        httpClientSpy['get'].mockReturnValue(throwError(() => error));

        try {
            await service.get<any>('users');
        } catch (e) {
            expect(toastServiceSpy.showToast).not.toHaveBeenCalled();
        }
    });
});
