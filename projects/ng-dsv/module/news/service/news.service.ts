import { inject, Injectable } from '@angular/core';
import { ID } from '@ng-vagabond-lab/ng-dsv/api';
import { BaseFetchService } from '@ng-vagabond-lab/ng-dsv/base/service';
import { StoreMap } from '@ng-vagabond-lab/ng-dsv/storage';
import { NewsDto } from '../dto/news.dto';
import { NewsListService } from './list/news-list.service';

@Injectable({
    providedIn: 'root',
})
export class NewsService extends BaseFetchService<NewsDto> {
    readonly newsListService = inject(NewsListService);
    readonly news = new StoreMap<ID, NewsDto>();

    doFetchNews(newsId: number): void {
        const url = '/news/' + newsId;
        const data = this.getDataFromState(url);
        if (data) {
            this.initNews(newsId, data);
            return;
        }
        this.apiService.get<NewsDto>(url, (data) => {
            this.setDataToState(url, data);
            this.initNews(newsId, data);
        });
    }

    initNews(newsId: ID, data: NewsDto) {
        this.news.set(newsId, data);
    }

    createOrUpdate(news: NewsDto, callback?: (data: NewsDto) => void) {
        const toast = "La news '" + news.title + "' a bien été " + (news.id ? 'mise a jour' : 'créer') + '.';
        this.apiService.createOrUpdate<NewsDto>(
            'news',
            news,
            (data) => {
                this.news.set(data.id, data);
                this.newsListService.fetchByPage(this.newsListService.search(), 1);
                callback?.(data);
            },
            toast,
        );
    }
}
