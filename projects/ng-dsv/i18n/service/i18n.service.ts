import { DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';
import { TranslateService, TranslationObject } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class I18nService {
    readonly LANGUAGE_FR = 'fr';
    readonly LANGUAGE_EN = 'en';
    readonly DEFAULT_LANGUAGE = this.LANGUAGE_FR;
    readonly SUPPORTED_LANGUAGES = [this.LANGUAGE_FR, this.LANGUAGE_EN];
    readonly LANGUAGE_STORAGE_NAME = 'language';

    readonly translateService = inject(TranslateService);
    readonly platformService = inject(PlatformService);
    readonly storageService = inject(StorageService);
    readonly document = inject(DOCUMENT);

    readonly currentLanguage = signal<string>('');
    readonly hasChange = signal<boolean>(false);

    constructor() {
        this.translateService.addLangs(this.SUPPORTED_LANGUAGES);
        this.translateService.setFallbackLang(this.DEFAULT_LANGUAGE);

        const storageLanguage = this.storageService.getItem<string>(this.LANGUAGE_STORAGE_NAME);
        const detectedLang = storageLanguage ?? this.detectLanguage();
        this.useLanguage(detectedLang);
    }

    initLanguage(fr: TranslationObject, en?: TranslationObject) {
        this.translateService.setTranslation(this.LANGUAGE_FR, fr);
        en && this.translateService.setTranslation(this.LANGUAGE_EN, en);
    }

    useLanguage(language: string) {
        this.storageService.setItem(this.LANGUAGE_STORAGE_NAME, language);
        this.translateService.use(language);
        this.currentLanguage.set(language);
        this.document.documentElement.lang = language;
    }

    switchLanguage(language: string) {
        this.useLanguage(language);
        this.hasChange.set(true);
    }

    private detectLanguage(): string {
        if (this.platformService.isPlatformBrowser()) {
            return this.detectBrowserLanguage();
        }
        return this.DEFAULT_LANGUAGE;
    }

    private detectBrowserLanguage(): string {
        const browserLangs = navigator.languages?.length ? navigator.languages : [navigator.language];

        const match = browserLangs
            .map((l) => l.substring(0, 2).toLowerCase())
            .find((l) => this.SUPPORTED_LANGUAGES.includes(l));

        return match ?? this.DEFAULT_LANGUAGE;
    }
}
