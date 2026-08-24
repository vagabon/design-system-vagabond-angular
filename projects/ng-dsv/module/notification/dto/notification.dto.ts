import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { UserDto } from '@ng-vagabond-lab/ng-dsv/module/auth';

export interface NotificationDto extends ApiDto {
    entityId: number;

    title: string;
    message: string;
    url: string;

    read: boolean;

    superType: string;
    type: string;
    category: string;

    user: UserDto;
    users: string;
}
