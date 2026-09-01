import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateFormatPipe } from '@ng-vagabond-lab/ng-dsv/date';
import { DsvCardComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { DsvFileShowComponent } from '@ng-vagabond-lab/ng-dsv/ds/file';
import { DsvMarkdownContainer } from '@ng-vagabond-lab/ng-dsv/ds/markdown';
import { RouterInternalPipe } from '@ng-vagabond-lab/ng-dsv/router';
import { NewsDto } from '../../../dto/news.dto';

@Component({
    selector: 'app-news-card-resume',
    imports: [
        DsvCardComponent,
        DateFormatPipe,
        RouterInternalPipe,
        RouterLink,
        DsvFileShowComponent,
        DsvMarkdownContainer,
    ],
    templateUrl: './news-card-resume.component.html',
    styleUrls: ['../news-card.component.scss', './news-card-resume.component.scss'],
})
export class NewsCardResumeComponent {
    readonly news = input<NewsDto>();
}
