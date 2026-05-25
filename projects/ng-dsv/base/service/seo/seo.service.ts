import { inject, Injectable, makeStateKey } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { BaseApiService } from '../base/base-api.service';

@Injectable({ providedIn: 'root' })
export class SeoService extends BaseApiService {
    readonly environmentService = inject(EnvironmentService);
    readonly title = inject(Title);
    readonly meta = inject(Meta);

    setMeta(title: string, description: string, image?: string): void {
        const newTitle = this.environmentService.config()?.APP_NAME + ' - ' + title;
        this.title.setTitle(newTitle);
        this.transferState.set(makeStateKey<string>('title'), newTitle);
        this.meta.updateTag({ name: 'description', content: description });
        image && this.meta.updateTag({ property: 'og:image', content: image });
    }
}
