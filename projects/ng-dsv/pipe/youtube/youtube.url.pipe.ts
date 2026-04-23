import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const YOUTUBE_EMBED_BASE = 'https://www.youtube.com/embed/';
const YOUTUBE_KEY_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

@Pipe({
    name: 'youtubeUrl',
    standalone: true,
})
export class YoutubeUrlPipe implements PipeTransform {
    private readonly sanitizer = inject(DomSanitizer);

    transform(key: string | null | undefined): SafeResourceUrl | null {
        if (!key || !YOUTUBE_KEY_PATTERN.test(key)) {
            return null;
        }
        const url = `${YOUTUBE_EMBED_BASE}${key}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url); // NOSONAR: URL validated by YOUTUBE_KEY_PATTERN
    }
}
