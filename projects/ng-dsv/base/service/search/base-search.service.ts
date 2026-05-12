import { Directive, signal } from '@angular/core';
import { ApiDto, PageableDto } from '@ng-vagabond-lab/ng-dsv/api';
import { removeDuplicate } from '@ng-vagabond-lab/ng-dsv/storage';
import { BaseFetchService } from '../fetch/base-fetch.service';

@Directive()
export abstract class BaseSearchService<T extends ApiDto> extends BaseFetchService<T[]> {
    readonly datas = signal<T[]>([]);
    readonly total = signal<number | undefined>(undefined);

    readonly page = signal<number>(1);
    readonly search = signal<string>('');
    readonly lastSearch = signal<string>('');
    readonly isLoading = signal<boolean>(false);
    readonly stopFetch = signal<boolean>(false);

    getUrl(page: number): string {
        let url = this.getEndPoint();
        const params = this.getParams();
        url += '?page=' + page + params + '&search=';
        return url;
    }

    abstract getEndPoint(): string;

    getParams(): string {
        return '';
    }

    fetchByPage(search: string, page: number): void {
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
        const url = this.getUrl(page);

        const data = this.getDataFromState(url);
        if (data) {
            this.updateData(page, data);
            this.isLoading.set(false);
            return;
        }
        this.isLoading.set(true);

        this.apiService.get<PageableDto<T[]>>(
            url + search,
            (data) => {
                this.page.set(page + 1);
                this.total.set(data.totalElements);
                this.setDataToState(url, data.content);
                this.isLoading.set(false);
                this.updateData(page, data.content);
            },
            () => {
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

    afterFetch(data: T[]): void {
        return;
    }
}
