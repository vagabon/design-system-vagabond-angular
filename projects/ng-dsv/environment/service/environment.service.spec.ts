// environment.service.spec.ts
import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EnvironmentDto } from '../public-api';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
    let service: EnvironmentService;
    let httpClientSpy: { get: ReturnType<typeof vi.fn>; post: ReturnType<typeof vi.fn> };

    const mockEnv: EnvironmentDto = {
        API_URL: 'https://example.com/api',
        GOOGLE_CLIENT_ID: 'AAA',
    };

    beforeEach(() => {
        httpClientSpy = {
            get: vi.fn(),
            post: vi.fn(),
        };

        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                EnvironmentService,
                { provide: HttpClient, useValue: httpClientSpy },
            ],
        });

        service = TestBed.inject(EnvironmentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call loadEnv and update env signal', () => {
        httpClientSpy.get.mockReturnValue(of(mockEnv));

        service.loadEnv();

        expect(service.env()).toEqual(mockEnv);
    });
});