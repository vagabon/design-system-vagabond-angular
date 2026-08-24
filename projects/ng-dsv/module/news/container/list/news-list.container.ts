import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BaseSearchContainer } from '@ng-vagabond-lab/ng-dsv/base';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { DsvCardComponent, DsvCardHeaderComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { DsvFormReactiveSearchbarComponent } from '@ng-vagabond-lab/ng-dsv/ds/form/reactive';
import { DsvScrollInfiniteContainer } from '@ng-vagabond-lab/ng-dsv/ds/scroll';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/module/auth';
import { NewsCardResumeComponent } from '../../component/card/resume/news-card-resume.component';
import { NewsDto } from '../../dto/news.dto';
import { NewsListService } from '../../service/list/news-list.service';

@Component({
    selector: 'app-news-list',
    imports: [
        DsvCardComponent,
        DsvFormReactiveSearchbarComponent,
        DsvScrollInfiniteContainer,
        NewsCardResumeComponent,
        DsvButtonComponent,
        DsvCardHeaderComponent,
        RouterLink,
    ],
    templateUrl: './news-list.container.html',
    styleUrl: './news-list.container.scss',
})
export class NewsListContainer extends BaseSearchContainer<NewsListService, NewsDto> {
    readonly auhService = inject(AuthService);

    readonly isAdmin = computed<boolean>(() => this.auhService.hasRole('ADMIN'));

    constructor(public newsListService: NewsListService) {
        super(newsListService);
        this.seoService.setMeta(
            'Les dernières news',
            'Retrouver les dernières news sur movie-keeper.fr',
            '/images/logo.png',
        );
    }
}
