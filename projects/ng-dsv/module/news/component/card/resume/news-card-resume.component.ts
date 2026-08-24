import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateFormatPipe } from '@ng-vagabond-lab/ng-dsv/date';
import { DsvCardComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { RouterInternalPipe } from '@ng-vagabond-lab/ng-dsv/router';
import { NewsMarkdownContainer } from '../../../container/markdown/news-markdown.container';
import { NewsDto } from '../../../dto/news.dto';

@Component({
    selector: 'app-news-card-resume',
    imports: [DsvCardComponent, DateFormatPipe, RouterInternalPipe, NewsMarkdownContainer, RouterLink],
    templateUrl: './news-card-resume.component.html',
    styleUrls: ['../news-card.component.scss', './news-card-resume.component.scss'],
})
export class NewsCardResumeComponent {
    readonly news = input<NewsDto>();
}
