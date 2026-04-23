import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ClickableUrlPipe } from './clickable.url.pipe';

describe('ClickableUrlPipe', () => {
    let pipe: ClickableUrlPipe;
    let sanitizer: DomSanitizer;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        sanitizer = TestBed.inject(DomSanitizer);
        pipe = TestBed.runInInjectionContext(() => new ClickableUrlPipe());
    });

    it('When value is null, Then returns null', () => {
        const result = pipe.transform(null);

        expect(result).toBeNull();
    });

    it('When value is undefined, Then returns null', () => {
        const result = pipe.transform(undefined);

        expect(result).toBeNull();
    });

    it('When value is empty string, Then returns null', () => {
        const result = pipe.transform('');

        expect(result).toBeNull();
    });

    it('When value has no URL, Then returns sanitized plain text unchanged', () => {
        const bypassSpy = vi.spyOn(sanitizer, 'bypassSecurityTrustHtml');

        const result = pipe.transform('hello world');

        expect(bypassSpy).toHaveBeenCalledOnce();
        expect(bypassSpy).toHaveBeenCalledWith('hello world');
        expect(result).toBeTruthy();
    });

    it('When value contains a single http URL, Then wraps it in an anchor tag with correct attributes', () => {
        const bypassSpy = vi.spyOn(sanitizer, 'bypassSecurityTrustHtml');
        const url = 'http://example.com';

        pipe.transform(`visit ${url} now`);

        expect(bypassSpy).toHaveBeenCalledWith(
            `visit <a class="text warning" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a> now`,
        );
    });

    it('When value contains a single https URL, Then wraps it in an anchor tag with correct attributes', () => {
        const bypassSpy = vi.spyOn(sanitizer, 'bypassSecurityTrustHtml');
        const url = 'https://example.com/path?q=1#anchor';

        pipe.transform(url);

        expect(bypassSpy).toHaveBeenCalledWith(
            `<a class="text warning" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`,
        );
    });

    it('When value contains multiple URLs, Then wraps each one independently', () => {
        const bypassSpy = vi.spyOn(sanitizer, 'bypassSecurityTrustHtml');
        const url1 = 'https://foo.com';
        const url2 = 'http://bar.org';

        pipe.transform(`${url1} and ${url2}`);

        const html = bypassSpy.mock.calls[0][0] as string;
        expect(html).toContain(`href="${url1}"`);
        expect(html).toContain(`href="${url2}"`);
        expect(html.match(/<a /g)).toHaveLength(2);
    });

    it('When value is only a URL, Then bypassSecurityTrustHtml is called and result is truthy', () => {
        const bypassSpy = vi.spyOn(sanitizer, 'bypassSecurityTrustHtml');

        const result = pipe.transform('https://angular.dev');

        expect(bypassSpy).toHaveBeenCalledOnce();
        expect(result).toBeTruthy();
    });
});
