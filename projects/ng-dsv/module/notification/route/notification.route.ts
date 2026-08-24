import { Routes } from '@angular/router';

export const NotificationRoute: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('../container/notification.container').then((m) => m.NotificationContainer),
    },
];
