import { inject, Injectable } from '@angular/core';
import { BaseSearchService } from '@ng-vagabond-lab/ng-dsv/base/service';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/module/auth';
import { NewsDto } from '../../dto/news.dto';

@Injectable({
    providedIn: 'root',
})
export class NewsListService extends BaseSearchService<NewsDto> {
    readonly authService = inject(AuthService);

    readonly news = this.datas;

    override getEndPoint(): string {
        return '/news/findBy';
    }

    override getParams(): string {
        let fields = '(title%And|Description%)AndActive>>creationDateDesc';
        let values = this.search() + ',' + this.search() + ',true';
        if (this.authService.isAdmin()) {
            fields = '(title%And|Description%)>>creationDateDesc';
            values = this.search() + ',' + this.search() + '';
        }
        return (
            '&fields=' +
            encodeURIComponent(fields) +
            '&values=' +
            values +
            '&first=' +
            (this.page() - 1) +
            '&max=20'
        );
    }
}
