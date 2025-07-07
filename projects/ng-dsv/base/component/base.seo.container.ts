import { inject, makeStateKey, TransferState } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

export abstract class BaseSeoContainer {
    public readonly title = inject(Title);
    public readonly transferState = inject(TransferState);
    public readonly meta = inject(Meta);

    setMeta(titleApp: string, title: string, description: string, image?: string) {
        const newTitle = titleApp + ' - ' + title;
        this.title.setTitle(newTitle);
        this.transferState.set(makeStateKey<string>('title'), newTitle);
        this.meta.updateTag({ name: 'description', content: description });
        image && this.meta.updateTag({ property: 'og:image', content: image });
    }

}