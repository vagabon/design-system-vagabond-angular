import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

@Pipe({
    name: 'clickableUrl',
    standalone: true,
})
export class ClickableUrlPipe implements PipeTransform {
    private readonly sanitizer = inject(DomSanitizer);

    transform(value: string | null | undefined): SafeHtml | null {
        if (!value) {
            return null;
        }
        const html = value.replaceAll(
            URL_PATTERN,
            (url) =>
                `<a class="text warning" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`,
        );
        return this.sanitizer.bypassSecurityTrustHtml(html); // NOSONAR: URLs extracted by URL_PATTERN
    }
}
