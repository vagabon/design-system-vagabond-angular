import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EnvironmentDto } from '../public-api';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
    let service: EnvironmentService;
    let httpClientSpy: { get: ReturnType<typeof vi.fn>; post: ReturnType<typeof vi.fn> };

    const mockEnv: EnvironmentDto = {
        APP_NAME: 'APP_NAME',
        GOOGLE_CLIENT_ID: 'GOOGLE_CLIENT_ID',
        CONTACT: 'CONTACT',
        COPIYRIGHT: 'COPIYRIGHT',
        PROD: true,
    };

    beforeEach(() => {
        httpClientSpy = {
            get: vi.fn(),
            post: vi.fn(),
        };

        TestBed.configureTestingModule({
            providers: [EnvironmentService, { provide: HttpClient, useValue: httpClientSpy }],
        });

        service = TestBed.inject(EnvironmentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call loadEnv and update env signal', () => {
        httpClientSpy.get.mockReturnValue(of(mockEnv));

        service.loadEnv();
        service.loadEnv();

        expect(service.config()).toEqual(mockEnv);
    });
});
