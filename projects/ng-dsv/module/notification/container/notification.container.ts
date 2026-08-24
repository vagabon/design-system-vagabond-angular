import { Component, inject } from '@angular/core';
import { BaseSearchContainer } from '@ng-vagabond-lab/ng-dsv/base';
import { DsvCardComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { DsvFormReactiveSearchbarComponent } from '@ng-vagabond-lab/ng-dsv/ds/form/reactive';
import { DsvModalAlertComponent, DsvModalButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/modal';
import { DsvScrollInfiniteContainer } from '@ng-vagabond-lab/ng-dsv/ds/scroll';
import { NotificationComponent } from '../component/notification.component';
import { NotificationDto } from '../dto/notification.dto';
import { NotificationSearchService } from '../service/notification-search.service';
import { NotificationService } from '../service/notification.service';

@Component({
    selector: 'app-notification-container',
    imports: [
        DsvCardComponent,
        DsvScrollInfiniteContainer,
        NotificationComponent,
        DsvModalAlertComponent,
        DsvModalButtonComponent,
        DsvFormReactiveSearchbarComponent,
    ],
    templateUrl: './notification.container.html',
    styleUrls: ['./notification.container.scss'],
})
export class NotificationContainer extends BaseSearchContainer<NotificationSearchService, NotificationDto> {
    readonly notificationService = inject(NotificationService);

    constructor(public notificationSearchService: NotificationSearchService) {
        super(notificationSearchService);
        this.requiredRole.set('USER');
    }

    doRead(notificaton: NotificationDto): void {
        notificaton.read = !notificaton.read;
        this.notificationService.notificationRead(notificaton);
    }

    doReadAll(): void {
        this.notificationService.readAll(() => {
            this.notificationSearchService.notifications.update((notifications) => [
                ...notifications.map((notification) => ({ ...notification, read: true })),
            ]);
        });
    }
}
