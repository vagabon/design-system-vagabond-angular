import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { NotificationSearchService } from './notification-search.service';

describe('NotificationSearchService', () => {
    let service: NotificationSearchService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideTranslateService(), NotificationSearchService],
        });

        service = TestBed.inject(NotificationSearchService);
        vi.clearAllMocks();
    });

    it('When getEndPoint, Then GET /notification/search', () => {
        const result = service.getEndPoint();
        expect(result).toBe('/notifications/search');
    });
});
