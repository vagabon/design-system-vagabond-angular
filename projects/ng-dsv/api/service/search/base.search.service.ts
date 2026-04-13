import { inject, Injectable, signal } from "@angular/core";
import { PlatformService } from "@ng-vagabond-lab/ng-dsv/platform";
import { Store } from "@ng-vagabond-lab/ng-dsv/storage";
import { PageableDto } from "../../public-api";
import { ApiService } from "../api.service";


@Injectable({ providedIn: 'root' })
export abstract class BaseSearchService<T> {
    readonly apiService = inject(ApiService);
    readonly platformService = inject(PlatformService);

    datas = new Store<T>();

    page = signal<number>(1);
    isLoading = signal<boolean>(false);
    stopLoad = signal<boolean>(false);
    search = signal<string>('');

    doLoad(url: string, search: string = '', page: number = 1, nbPage: number = 20, field: string = 'content') {
        const params = '?page=' + page + '&nbPage=' + nbPage + '&query=' + search;

        this.search.set(search);
        if (page === 1) {
            this.stopLoad.set(false);
        }
        if (this.stopLoad()) {
            return;
        }
        this.isLoading.set(true);
        this.apiService.get<PageableDto<T>>(url + params, (data) => {
            this.page.set(page + nbPage);
            this.datas.updateForPage(page, data[field as keyof PageableDto<T>] as T[]);
            if ((data[field as keyof PageableDto<T>] as T[])?.length === 0) {
                this.stopLoad.set(true);
            }
            this.isLoading.set(false);
        });
    }
}