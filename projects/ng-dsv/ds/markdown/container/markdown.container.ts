import { Component, inject, input } from '@angular/core';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
    selector: 'dsv-markdown-container',
    imports: [MarkdownComponent],
    templateUrl: './markdown.container.html',
    styleUrl: './markdown.container.scss',
})
export class DsvMarkdownContainer {
    readonly routerService = inject(RouterService);

    readonly data = input<string | undefined>('');

    handleClick(event: MouseEvent | KeyboardEvent) {
        const target = event.target as HTMLElement;
        const anchor = target.closest('a');

        if (anchor) {
            const href = anchor.getAttribute('href');
            if (href?.startsWith('/')) {
                event.preventDefault();
                event.stopPropagation();
                this.routerService.router.navigate([href]);
            }
        }
    }
}
