import { inject, Injectable, makeStateKey } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BaseApiService } from '../base/base-api.service';

@Injectable({ providedIn: 'root' })
export class SeoService extends BaseApiService {
    readonly title = inject(Title);
    readonly meta = inject(Meta);

    setMeta(titleApp: string, title: string, description: string, image?: string): void {
        const newTitle = titleApp + ' - ' + title;
        this.title.setTitle(newTitle);
        this.transferState.set(makeStateKey<string>('title'), newTitle);
        this.meta.updateTag({ name: 'description', content: description });
        image && this.meta.updateTag({ property: 'og:image', content: image });
    }
}
