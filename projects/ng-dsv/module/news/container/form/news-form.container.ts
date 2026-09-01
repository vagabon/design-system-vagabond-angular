import { Component, effect, signal } from '@angular/core';
import { form, required, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { DsvCardComponent, DsvCardHeaderComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { FileUploadContainer } from '@ng-vagabond-lab/ng-dsv/ds/file';
import {
    DsvFormSignalCheckboxComponent,
    DsvFormSignalComponent,
    DsvFormSignalInputComponent,
    requiredTrim,
} from '@ng-vagabond-lab/ng-dsv/ds/form/signal';
import { NewsDto } from '../../dto/news.dto';
import { NewsContainer } from '../news.container';

@Component({
    selector: 'app-news-form',
    imports: [
        DsvCardComponent,
        DsvFormSignalComponent,
        DsvFormSignalInputComponent,
        DsvCardHeaderComponent,
        DsvButtonComponent,
        RouterLink,
        DsvFormSignalCheckboxComponent,
        FileUploadContainer,
    ],
    templateUrl: './news-form.container.html',
    styleUrl: './news-form.container.scss',
})
export class NewsFormContainer extends NewsContainer {
    readonly newsForm = form(signal<NewsDto>(this.news()!), (path) => {
        required(path.title);
        required(path.resume);
        required(path.description);
        validate(path.title, requiredTrim);
        validate(path.resume, requiredTrim);
        validate(path.description, requiredTrim);
    });

    constructor() {
        super();
        effect(() => {
            if (this.news()) {
                this.newsForm().reset(this.news());
            } else {
                this.newsForm().reset({
                    title: '',
                    image: '',
                    tags: '',
                    resume: '',
                    description: '',
                    user: this.authService.userConnected()!,
                } as NewsDto);
            }
        });
    }

    doSubmit() {
        if (this.newsForm().valid()) {
            this.newsService.createOrUpdate(this.newsForm().value(), (data: NewsDto) => {
                this.routerService.router.navigate(['news', data.id]);
                document.getElementById('main-scroll')?.scrollTo(0, 0);
            });
        }
    }
}
