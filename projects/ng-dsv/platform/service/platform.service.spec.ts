import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PlatformService } from './platform.service';

describe('PlatformService', () => {
    let service: PlatformService;
    let platformId: any;

    beforeEach(() => {
        platformId = 'browser';

        TestBed.configureTestingModule({
            providers: [PlatformService, { provide: PLATFORM_ID, useValue: platformId }],
        });

        service = TestBed.inject(PlatformService);

        vi.spyOn(service, 'isPlatformBrowser');
    });

    it('should detect platform browser', () => {
        expect(service.isPlatformBrowser()).toBe(true);
    });
});
