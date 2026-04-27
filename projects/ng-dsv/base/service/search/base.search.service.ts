import { Injectable, signal } from '@angular/core';
import { ApiDto, PageableDto } from '@ng-vagabond-lab/ng-dsv/api';
import { removeDuplicate } from '@ng-vagabond-lab/ng-dsv/storage';
import { BaseFetchService } from '../fetch/base.fetch.service';

@Injectable({ providedIn: 'root' })
export abstract class BaseSearchService<T extends ApiDto> extends BaseFetchService<T[]> {
    datas = signal<T[]>([]);
    total = signal<number | undefined>(undefined);

    page = signal<number>(1);
    search = signal<string>('');
    isLoading = signal<boolean>(false);
    stopFetch = signal<boolean>(false);

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

    fetchByPage(search: string = '', page: number = 1): void {
        this.search.set(search);
        if (page === 1) {
            this.stopFetch.set(false);
        }
        if (this.stopFetch()) {
            return;
        }
        const url = this.getUrl();

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
