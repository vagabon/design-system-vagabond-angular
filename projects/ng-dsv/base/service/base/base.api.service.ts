import { Directive, inject } from '@angular/core';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { BaseService } from './base.service';

@Directive()
export abstract class BaseApiService extends BaseService {
    readonly apiService = inject(ApiService);
}
