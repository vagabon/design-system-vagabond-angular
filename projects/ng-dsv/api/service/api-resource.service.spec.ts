import { httpResource } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiResourceService } from './api-resource.service';

const mockResourceRef = {};

const mockHttpResource = vi.fn().mockImplementation((configFn: () => any) => {
    return mockResourceRef;
});

describe('ApiResourceService', () => {
    let service: ApiResourceService<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ApiResourceService, { provide: httpResource, useValue: mockHttpResource }],
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
