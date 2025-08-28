import { httpResource, provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ApiResourceService } from './api.resource.service';

// Mock de ResourceRef
const mockResourceRef = {};

// Mock de httpResource
const mockHttpResource = jasmine.createSpy('httpResource').and.callFake((configFn: () => any) => {
    return mockResourceRef;
});

describe('ApiResourceService', () => {
    let service: ApiResourceService<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiResourceService,
                provideZonelessChangeDetection(),
                provideHttpClient(),
                { provide: httpResource, useValue: mockHttpResource },
            ],
        });

        service = TestBed.inject(ApiResourceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize with undefined url', () => {
        expect(service.url()).toBeUndefined();
    });
});
