import { inject, Injectable, signal } from '@angular/core';
import { JSONObject } from '@ng-vagabond-lab/ng-dsv/api';
import { BaseApiService } from '@ng-vagabond-lab/ng-dsv/base/service';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { NotificationDto } from '../dto/notification.dto';
import { NotificationSearchService } from './notification-search.service';

@Injectable({ providedIn: 'root' })
export class NotificationService extends BaseApiService {
    readonly notificationSearchService = inject(NotificationSearchService);
    readonly routerService = inject(RouterService);

    readonly nbRead = signal<number>(0);

    fetchNbRead(): void {
        this.apiService.get<number>('/notifications/count', (data) => {
            if (data !== this.nbRead()) {
                this.notificationSearchService.notifications.set([]);
                this.notificationSearchService.search.set('');
                this.notificationSearchService.page.set(1);
                this.notificationSearchService.stopFetch.set(false);
                this.notificationSearchService.lasturl.set('');
            }
            this.nbRead.set(Number(data));
        });
    }

    readAll(callback: () => void): void {
        this.apiService.put<JSONObject>('/notifications/read-all', {}, () => {
            this.nbRead.set(0);
            callback();
        });
    }

    notificationRead(notification: NotificationDto): void {
        this.apiService.put('/notifications/read/' + notification.id, {}, () => {
            this.nbRead.update((nb) => nb + (notification.read ? -1 : 1));
        });
    }
}
