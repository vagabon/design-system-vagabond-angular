import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateFormatPipe } from '@ng-vagabond-lab/ng-dsv/date';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { DsvCardComponent, DsvCardHeaderComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { DsvFileShowComponent } from '@ng-vagabond-lab/ng-dsv/ds/file';
import { DsvMarkdownContainer } from '@ng-vagabond-lab/ng-dsv/ds/markdown';
import { NewsDto } from '../../dto/news.dto';

@Component({
    selector: 'app-news-card',
    imports: [
        DsvCardComponent,
        DateFormatPipe,
        DsvCardHeaderComponent,
        DsvButtonComponent,
        RouterLink,
        DsvFileShowComponent,
        DsvMarkdownContainer,
    ],
    templateUrl: './news-card.component.html',
    styleUrl: './news-card.component.scss',
})
export class NewsCardComponent {
    readonly news = input<NewsDto>();
}
