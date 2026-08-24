import { Routes } from '@angular/router';
import { authGuard } from '@ng-vagabond-lab/ng-dsv/module/auth';

export const NewsRoute: Routes = [
    {
        path: '',
        loadComponent: () => import('../container/list/news-list.container').then((m) => m.NewsListContainer),
    },
    {
        path: 'create',
        loadComponent: () => import('../container/form/news-form.container').then((m) => m.NewsFormContainer),
        canActivate: [authGuard('ADMIN')],
    },
    {
        path: 'update/:newsId',
        loadComponent: () => import('../container/form/news-form.container').then((m) => m.NewsFormContainer),
        canActivate: [authGuard('ADMIN')],
    },
    {
        path: ':newsId',
        loadComponent: () => import('../container/news.container').then((m) => m.NewsContainer),
    },
];
