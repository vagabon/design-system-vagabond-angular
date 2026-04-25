import { inject, Injectable, makeStateKey } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BaseApiService } from '../base/base.api.service';

@Injectable({ providedIn: 'root' })
export class SeoService extends BaseApiService {
    public readonly title = inject(Title);
    public readonly meta = inject(Meta);

    setMeta(titleApp: string, title: string, description: string, image?: string) {
        const newTitle = titleApp + ' - ' + title;
        this.title.setTitle(newTitle);
        this.transferState.set(makeStateKey<string>('title'), newTitle);
        this.meta.updateTag({ name: 'description', content: description });
        image && this.meta.updateTag({ property: 'og:image', content: image });
    }
}
