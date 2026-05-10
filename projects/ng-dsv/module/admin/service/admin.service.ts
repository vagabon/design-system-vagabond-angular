import { inject, Injectable, signal } from '@angular/core';
import { ApiDto, ApiService, PageableDto } from '@ng-vagabond-lab/ng-dsv/api';
import { AdminTabConfDto } from '../dto/admin.dto';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    readonly apiService = inject(ApiService);

    readonly tabs = signal<AdminTabConfDto>({} as AdminTabConfDto);

    readonly datas = signal<Record<string, PageableDto<ApiDto[]>>>({});
    readonly data = signal<ApiDto>({} as ApiDto);

    readonly page = signal<Record<string, number>>({});
    readonly search = signal<Record<string, string>>({});

    get(
        endpoint: string,
        fields: string,
        search: string,
        page: number = 0,
        max: number = 10,
        callback?: (data: PageableDto<ApiDto[]>) => void,
    ): void {
        const url =
            '/' +
            endpoint +
            '/findBy?fields=' +
            fields +
            '&values=' +
            search +
            '&first=' +
            page +
            '&max=' +
            max;

        const callbackResponse =
            callback ??
            ((data: PageableDto<ApiDto[]>) => {
                this.datas.update((s) => ({ ...s, [endpoint]: data }));
            });
        this.apiService.get<PageableDto<ApiDto[]>>(encodeURI(url), callbackResponse);
    }

    post(endpoint: string, data: ApiDto): void {
        const url = '/' + endpoint;
        this.apiService.post<ApiDto>(encodeURI(url), data, (response) => {
            this.data.set(response);
        });
    }

    put(endpoint: string, data: ApiDto): void {
        const url = '/' + endpoint;
        this.apiService.put<ApiDto>(encodeURI(url), data, (response) => {
            this.data.set(response);
        });
    }

    findById(endpoint: string, id: string): void {
        const url = '/' + endpoint + '/' + id;
        this.apiService.get<ApiDto>(encodeURI(url), (data) => {
            this.data.set(data);
        });
    }
}
