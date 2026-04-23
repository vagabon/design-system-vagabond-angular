import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { YoutubeUrlPipe } from './youtube.url.pipe';

describe('YoutubeUrlPipe', () => {
    let pipe: YoutubeUrlPipe;
    let sanitizer: DomSanitizer;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        sanitizer = TestBed.inject(DomSanitizer);
        pipe = TestBed.runInInjectionContext(() => new YoutubeUrlPipe());
    });

    it('When key is null, Then returns null', () => {
        expect(pipe.transform(null)).toBeNull();
    });

    it('When key is undefined, Then returns null', () => {
        expect(pipe.transform(undefined)).toBeNull();
    });

    it('When key is empty string, Then returns null', () => {
        expect(pipe.transform('')).toBeNull();
    });

    it('When key is shorter than 11 chars, Then returns null', () => {
        expect(pipe.transform('abc123')).toBeNull();
    });

    it('When key is longer than 11 chars, Then returns null', () => {
        expect(pipe.transform('abc123def456g')).toBeNull();
    });

    it('When key contains invalid characters, Then returns null', () => {
        expect(pipe.transform('abc!@#def456')).toBeNull();
        expect(pipe.transform('abc def4567')).toBeNull();
        expect(pipe.transform('abc.def4567')).toBeNull();
    });

    it('When key is a valid 11-char alphanumeric key, Then calls bypassSecurityTrustResourceUrl with correct embed URL', () => {
        const bypassSpy = vi.spyOn(sanitizer, 'bypassSecurityTrustResourceUrl');
        const key = 'dQw4w9WgXcQ';

        const result = pipe.transform(key);

        expect(bypassSpy).toHaveBeenCalledOnce();
        expect(bypassSpy).toHaveBeenCalledWith(`https://www.youtube.com/embed/${key}`);
        expect(result).toBeTruthy();
    });

    it('When key uses allowed special chars _ and -, Then calls bypassSecurityTrustResourceUrl with correct URL', () => {
        const bypassSpy = vi.spyOn(sanitizer, 'bypassSecurityTrustResourceUrl');
        const key = 'abc_def-123';

        pipe.transform(key);

        expect(bypassSpy).toHaveBeenCalledOnce();
        expect(bypassSpy).toHaveBeenCalledWith(`https://www.youtube.com/embed/${key}`);
    });
});
