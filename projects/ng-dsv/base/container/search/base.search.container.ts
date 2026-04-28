import { Directive, effect, ElementRef, inject } from '@angular/core';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { SCROLL_CLASS, scrollToTop } from '@ng-vagabond-lab/ng-dsv/ds/scroll';
import { BaseSearchService } from '../../service';
import { BaseContainer } from '../base.container';

@Directive()
export abstract class BaseSearchContainer<
    T extends BaseSearchService<U>,
    U extends ApiDto,
> extends BaseContainer {
    private element = inject(ElementRef);

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
        scrollToTop(this.element, SCROLL_CLASS);
        this.doFetch(search);
    }
}
