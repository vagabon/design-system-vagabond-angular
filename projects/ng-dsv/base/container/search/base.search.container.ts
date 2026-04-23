import { effect, inject } from '@angular/core';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { scrollOnClassTo } from '@ng-vagabond-lab/ng-dsv/ds/scroll';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/modules/auth';
import { BaseSearchService } from '../../service';
import { SeoService } from '../../service/seo/seo.service';

export abstract class BaseSearchContainer<T extends BaseSearchService<U>, U extends ApiDto> {
    readonly authService = inject(AuthService);
    readonly seoService = inject(SeoService);

    readonly service: T | undefined = undefined;

    constructor(searchService: T) {
        this.service = searchService;
        this.service.isLoading.set(true);
        effect(() => {
            if (
                this.service?.datas().length === 0 &&
                this.service.search() === '' &&
                !this.service.stopFetch() &&
                (this.service.ssr() || this.authService.isPlatformBrowser())
            ) {
                this.doFetch();
            }
        });
    }

    doFetch(search: string | undefined = this.service?.search()): void {
        this.service?.fetchByPage(search, this.service?.page());
    }

    doSearch(search: string) {
        this.service?.page.set(1);
        scrollOnClassTo('scroll', 0, 0);
        this.doFetch(search);
    }
}
