import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EnvironmentDto } from '../public-api';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
    let service: EnvironmentService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    const mockEnv: EnvironmentDto = {
        API_URL: 'https://example.com/api',
        GOOGLE_CLIENT_ID: "AAA",
    };

    beforeEach(() => {
        let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get', 'post']);
        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                EnvironmentService,
                {
                    provide: HttpClient,
                    useValue: httpClientSpyObj,
                },
            ],
        });

        service = TestBed.inject(EnvironmentService);
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call loadEnv and update env signal', () => {
        httpClientSpy.get.and.returnValue(of(mockEnv));
        service.loadEnv();
        expect(service.env()).toEqual(mockEnv);
    });
});
