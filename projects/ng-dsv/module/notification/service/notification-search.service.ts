import { Injectable } from '@angular/core';
import { BaseSearchService } from '@ng-vagabond-lab/ng-dsv/base/service';
import { NotificationDto } from '../dto/notification.dto';

@Injectable({ providedIn: 'root' })
export class NotificationSearchService extends BaseSearchService<NotificationDto> {
    readonly notifications = this.datas;

    override getEndPoint(): string {
        return '/notification/search';
    }
}
