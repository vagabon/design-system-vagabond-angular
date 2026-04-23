import { inject } from '@angular/core';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/modules/auth';
import { SeoService } from '../service/seo/seo.service';

export abstract class BaseContainer {
    readonly authService = inject(AuthService);
    readonly seoService = inject(SeoService);
}
