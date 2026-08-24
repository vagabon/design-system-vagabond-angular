import { Component, inject, input } from '@angular/core';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
    selector: 'app-news-markdown-container',
    imports: [MarkdownComponent],
    templateUrl: './news-markdown.container.html',
    styleUrl: './news-markdown.container.scss',
})
export class NewsMarkdownContainer {
    readonly routerService = inject(RouterService);

    readonly data = input<string | undefined>('');

    handleClick(event: MouseEvent | KeyboardEvent) {
        const target = event.target as HTMLElement;
        const anchor = target.closest('a');

        if (anchor) {
            const href = anchor.getAttribute('href');
            if (href?.startsWith('/') || href?.includes('movie-keeper.fr')) {
                event.preventDefault();
                event.stopPropagation();
                const path = href.replace('https://movie-keeper.fr', '');
                this.routerService.router.navigate([path]);
            }
        }
    }
}
