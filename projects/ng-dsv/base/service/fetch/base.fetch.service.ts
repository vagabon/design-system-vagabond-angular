import { Directive, makeStateKey, signal, StateKey } from '@angular/core';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { BaseApiService } from '../base/base.api.service';

@Directive()
export abstract class BaseFetchService<D extends ApiDto | ApiDto[]> extends BaseApiService {
    //abstract fetch(id: number): D;

    readonly ssr = signal<boolean>(true);

    getStateKey(url: string): StateKey<D> {
        return makeStateKey<D>(url);
    }

    getDataFromState(url: string): D | null {
        const key = this.getStateKey(url);
        let data = null;
        if (this.transferState.hasKey(key)) {
            data = this.transferState.get(key, null);
            this.transferState.remove(key);
        }
        return data;
    }

    setDataToState(url: string, data: D | null) {
        if (!this.isPlatformBrowser()) {
            const key = this.getStateKey(url);
            this.transferState.set(key, data);
        }
    }
}
