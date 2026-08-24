import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BaseRouteContainer } from '@ng-vagabond-lab/ng-dsv/base';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/module/auth';
import { NewsCardComponent } from '../component/card/news-card.component';
import { NewsDto } from '../dto/news.dto';
import { NewsService } from '../service/news.service';

@Component({
    selector: 'app-news',
    imports: [NewsCardComponent, DsvButtonComponent, RouterLink],
    templateUrl: './news.container.html',
    styleUrl: './news.container.scss',
})
export class NewsContainer extends BaseRouteContainer {
    readonly auhService = inject(AuthService);
    readonly newsService = inject(NewsService);

    readonly newsId = signal<number>(0);
    readonly news = signal<NewsDto | undefined>(undefined);

    readonly isAdmin = computed<boolean>(() => this.auhService.hasRole('ADMIN'));

    constructor() {
        super();
        effect(() => {
            const newsId = Number(this.routeParams()?.['newsId']);
            if (Number.isInteger(newsId)) {
                this.newsId?.set(newsId);
                if (this.newsService.news.get(newsId)) {
                    const news = this.newsService.news.get(newsId);
                    this.seoService.setMeta(news?.title!, news?.resume!, news?.image);
                } else if (this.authService.canFetch()) {
                    this.newsService.doFetchNews(newsId);
                }
            }
        });
        effect(() => {
            if (this.newsId() && this.newsService.news.data()) {
                this.news.set(this.newsService.news.get(this.newsId()));
            }
        });
    }

    async doShare(news: NewsDto): Promise<void> {
        await globalThis.navigator.share({
            title: news.title,
            text: news.resume,
            url: 'https://movie-keeper.fr/news/' + news.id,
        });
    }
}
