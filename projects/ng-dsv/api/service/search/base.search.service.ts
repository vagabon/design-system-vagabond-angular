import { inject, Injectable, signal } from '@angular/core';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { Store } from '@ng-vagabond-lab/ng-dsv/storage';
import { ApiDto, ID, PageableDto } from '../../public-api';
import { ApiService } from '../api.service';

@Injectable({ providedIn: 'root' })
export abstract class BaseSearchService<T extends ApiDto> {
    readonly apiService = inject(ApiService);
    readonly platformService = inject(PlatformService);

    datas = new Store<T>();

    page = signal<number>(1);
    isLoading = signal<boolean>(false);
    stopLoad = signal<boolean>(false);
    search = signal<string>('');
    newIds = signal<ID[]>([]);

    lastUrl = signal<string>('');

    doLoad(url: string, search: string = '', page: number = 1, nbPage: number = 1) {
        this.search.set(search);
        if (page === 1) {
            this.stopLoad.set(false);
        }
        if (this.stopLoad()) {
            return;
        }
        if (this.lastUrl() === url) {
            return;
        }
        this.isLoading.set(true);
        this.lastUrl.set(url);
        this.apiService.get<PageableDto<T[]>>(
            url + search,
            (data) => {
                this.page.set(page + nbPage);
                this.datas.updateForPage(page, data.content);
                this.newIds.set(data.content.map((item) => item.id));
                if (data.content?.length === 0) {
                    this.stopLoad.set(true);
                }
                this.isLoading.set(false);
            },
            () => {
                this.stopLoad.set(true);
            },
        );
    }
}
