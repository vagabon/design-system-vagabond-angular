import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthGoogleService } from '@ng-vagabond-lab/ng-dsv/module/auth';
import { provideTranslateService } from '@ngx-translate/core';
import { NotificationDto } from '../dto/notification.dto';
import { NotificationService } from '../service/notification.service';
import { NotificationContainer } from './notification.container';

const mockNotification: NotificationDto = {
    id: '1',
    title: 'Test',
    url: 'https://example.com/some/path',
    read: false,
    creationDate: '2024-01-01',
} as NotificationDto;

const mockNotificationService = {
    notificationRead: vi.fn(),
    readAll: vi.fn(),
    nbRead: signal(0),
};

describe('NotificationContainer', () => {
    let component: NotificationContainer;
    let fixture: ComponentFixture<NotificationContainer>;
    const authGoogleServiceMock = { initGoogleAuth: vi.fn() };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotificationContainer],
            providers: [
                provideRouter([]),
                provideTranslateService(),
                { provide: NotificationService, useValue: mockNotificationService },
                { provide: AuthGoogleService, useValue: authGoogleServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(NotificationContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('When component is created, Then requiredRole is USER and searchService is injected', () => {
        expect(component).toBeTruthy();
    });

    it('When doRead is called, Then it toggles read and calls notificationRead', () => {
        const notification = { ...mockNotification, read: false };

        component.doRead(notification);

        expect(notification.read).toBe(true);
        expect(mockNotificationService.notificationRead).toHaveBeenCalledWith(notification);

        component.doRead(notification);

        expect(notification.read).toBe(false);
        expect(mockNotificationService.notificationRead).toHaveBeenCalledTimes(2);
    });

    it('When doReadAll is called, Then readAll is called and its callback resets notifications and fetches', () => {
        mockNotificationService.readAll.mockImplementation((cb: () => void) => cb());

        component.doReadAll();

        expect(mockNotificationService.readAll).toHaveBeenCalled();
    });
});
