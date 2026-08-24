import { TestBed } from '@angular/core/testing';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { provideTranslateService } from '@ngx-translate/core';
import { NotificationDto } from '../dto/notification.dto';
import { NotificationService } from './notification.service';

const mockApiService = { get: vi.fn(), put: vi.fn() };

const mockNotification: NotificationDto = {
    id: '1',
    title: 'Test',
    url: 'https://example.com/some/path',
    read: false,
    creationDate: '2024-01-01',
} as NotificationDto;

describe('NotificationService', () => {
    let service: NotificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideTranslateService(),
                NotificationService,
                { provide: ApiService, useValue: mockApiService },
            ],
        });

        service = TestBed.inject(NotificationService);
        vi.clearAllMocks();
    });

    it('When fetchNbRead is called, Then GET /notification/count is called and nbRead is updated', () => {
        mockApiService.get.mockImplementationOnce((_: string, cb: (data: number) => void) => cb(42));
        mockApiService.get.mockImplementationOnce(() => {});

        service.fetchNbRead();

        expect(mockApiService.get).toHaveBeenCalledWith('/notification/count', expect.any(Function));
        expect(service.nbRead()).toBe(42);
    });

    it('When readAll is called, Then PUT /notification/read-all is called, nbRead resets to 0 and callback is invoked', () => {
        service.nbRead.set(5);
        const callback = vi.fn();
        mockApiService.put.mockImplementation((_: string, __: unknown, cb: () => void) => cb());

        service.readAll(callback);

        expect(mockApiService.put).toHaveBeenCalledWith('/notification/read-all', {}, expect.any(Function));
        expect(service.nbRead()).toBe(0);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('When notificationRead is called with read=false, Then PUT is called and nbRead decrements', () => {
        service.nbRead.set(3);
        mockApiService.put.mockImplementation((_: string, __: unknown, cb: () => void) => cb());

        service.notificationRead({ ...mockNotification, read: true });

        expect(mockApiService.put).toHaveBeenCalledWith('/notification/read/1', {}, expect.any(Function));
        expect(service.nbRead()).toBe(2);
    });

    it('When notificationRead is called with read=false, Then nbRead increments', () => {
        service.nbRead.set(3);
        mockApiService.put.mockImplementation((_: string, __: unknown, cb: () => void) => cb());

        service.notificationRead({ ...mockNotification, read: false });

        expect(service.nbRead()).toBe(4);
    });
});
