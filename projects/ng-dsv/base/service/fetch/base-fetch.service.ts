import { Directive, makeStateKey, signal, StateKey } from '@angular/core';
import { ApiDto, JSONObject, PageableDto } from '@ng-vagabond-lab/ng-dsv/api';
import { BaseApiService } from '../base/base-api.service';

@Directive()
export abstract class BaseFetchService<
    A extends ApiDto | ApiDto[] | PageableDto<ApiDto[]>,
> extends BaseApiService {
    readonly ssr = signal<boolean>(true);

    getStateKey(url: string): StateKey<A> {
        return makeStateKey<A>(url);
    }

    getDataFromState(url: string): A | null {
        const key = this.getStateKey(url);
        let data = null;
        if (this.transferState.hasKey(key)) {
            data = this.transferState.get(key, null);
            this.transferState.remove(key);
            this.apiService.info('load state', data as JSONObject);
        }
        return data;
    }

    setDataToState(url: string, data: A | null): void {
        if (!this.isPlatformBrowser()) {
            const key = this.getStateKey(url);
            this.transferState.set(key, data);
        }
    }
}
