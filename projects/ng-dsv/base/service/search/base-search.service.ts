import { Directive, signal } from '@angular/core';
import { ApiDto, PageableDto } from '@ng-vagabond-lab/ng-dsv/api';
import { removeDuplicate } from '@ng-vagabond-lab/ng-dsv/storage';
import { BaseFetchService } from '../fetch/base-fetch.service';

@Directive()
export abstract class BaseSearchService<T extends ApiDto> extends BaseFetchService<PageableDto<T[]>> {
    readonly datas = signal<T[]>([]);
    readonly total = signal<number | undefined>(undefined);

    readonly page = signal<number>(1);
    readonly search = signal<string>('');
    readonly lastSearch = signal<string>('');
    readonly lasturl = signal<string>('');
    readonly isLoading = signal<boolean>(false);
    readonly stopFetch = signal<boolean>(false);

    getUrl(): string {
        let url = this.getEndPoint();
        const params = this.getParams();
        url += '?page=' + this.page() + params + '&search=';
        return url;
    }

    abstract getEndPoint(): string;

    getParams(): string {
        return '';
    }

    fetchByPage(search: string, page: number, force: boolean = false): void {
        this.search.set(search);
        if (search !== this.lastSearch()) {
            this.lastSearch.set(search);
            page = 1;
        }
        if (page === 1) {
            this.stopFetch.set(false);
        }
        if (this.stopFetch()) {
            return;
        }
        this.page.set(page);
        const url = this.getUrl() + search;

        if (this.lasturl() === url && !force) {
            return;
        }
        this.lasturl.set(url);

        const data = this.getDataFromState(url);
        if (data) {
            this.total.set(data.totalElements);
            this.updateData(page, data.content);
            this.isLoading.set(false);
            return;
        }
        this.isLoading.set(true);

        this.apiService.get<PageableDto<T[]>>(
            url,
            (data) => {
                this.page.set(page + 1);
                this.total.set(data.totalElements);
                this.setDataToState(url, data);
                this.isLoading.set(false);
                this.updateData(page, data.content);
            },
            () => {
                this.isLoading.set(false);
                this.stopFetch.set(true);
            },
        );
    }

    updateData(page: number, datas: T[]): void {
        if (page === 1) {
            this.datas.set([]);
        }
        this.datas.update((current) => removeDuplicate([...current, ...datas]));
        if (datas?.length === 0) {
            this.stopFetch.set(true);
        }
        this.afterFetch(datas);
    }

    afterFetch(_: T[]): void {
        return;
    }
}
