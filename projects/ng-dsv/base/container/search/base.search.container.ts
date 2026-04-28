import { effect } from '@angular/core';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { scrollOnClassTo } from '@ng-vagabond-lab/ng-dsv/ds/scroll';
import { BaseSearchService } from '../../service';
import { BaseContainer } from '../base.container';

export abstract class BaseSearchContainer<
    T extends BaseSearchService<U>,
    U extends ApiDto,
> extends BaseContainer {
    readonly service: T | undefined = undefined;

    constructor(searchService: T) {
        super();
        this.service = searchService;
        this.service.isLoading.set(true);
        effect(() => {
            if (
                this.service?.datas().length === 0 &&
                this.service.search() === '' &&
                !this.service.stopFetch() &&
                this.authService.canFetch(this.service.ssr())
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
