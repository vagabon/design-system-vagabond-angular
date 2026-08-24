// notification.button.container.spec.ts
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { NotificationSearchService } from '../../service/notification-search.service';
import { NotificationService } from '../../service/notification.service';
import { NotificationButtonContainer } from './notification-button.container';

const userConnected = signal(false);
const currentUrl = signal('');
const nbRead = signal(0);
const notifications = signal([]);
const page = signal(1);
const search = signal('');

const mockAuthService = { userConnected };
const mockRouterService = { currentUrl };
const mockNotificationService = { fetchNbRead: vi.fn(), nbRead };
const mockNotificationSearchService = { notifications, page, search };

describe('NotificationButtonContainer', () => {
    let component: NotificationButtonContainer;
    let fixture: ComponentFixture<NotificationButtonContainer>;

    beforeEach(async () => {
        vi.clearAllMocks();

        await TestBed.configureTestingModule({
            imports: [NotificationButtonContainer],
            providers: [
                provideRouter([]),
                provideTranslateService(),
                { provide: 'AuthService', useValue: mockAuthService },
                { provide: NotificationService, useValue: mockNotificationService },
                { provide: NotificationSearchService, useValue: mockNotificationSearchService },
                { provide: 'RouterService', useValue: mockRouterService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(NotificationButtonContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('When userConnected and currentUrl are truthy, Then fetchNbRead is called and search state is reset', async () => {
        userConnected.set(true);
        currentUrl.set('/notifications');
        fixture.detectChanges();
        await fixture.whenStable();

        expect(notifications()).toEqual([]);
        expect(page()).toBe(1);
        expect(search()).toBe('');
    });

    it('When userConnected is false, Then fetchNbRead is not called', async () => {
        userConnected.set(false);
        currentUrl.set('/notifications');
        fixture.detectChanges();
        await fixture.whenStable();

        expect(mockNotificationService.fetchNbRead).not.toHaveBeenCalled();
    });

    it('When nbRead is 0, Then nbRead signal is empty string', async () => {
        nbRead.set(0);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.nbRead()).toBe('');
    });

    it('When nbRead is between 1 and 99, Then nbRead signal is the string value', async () => {
        nbRead.set(5);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.nbRead()).toBe('5');

        nbRead.set(99);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.nbRead()).toBe('99');
    });

    it('When nbRead exceeds 99, Then nbRead signal is 99+', async () => {
        nbRead.set(100);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.nbRead()).toBe('99+');
    });
});
