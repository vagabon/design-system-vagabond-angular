import { TestBed } from '@angular/core/testing';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from './i18n.service';

const mockTranslateService = {
    addLangs: vi.fn(),
    setFallbackLang: vi.fn(),
    use: vi.fn(),
    setTranslation: vi.fn(),
};

const mockPlatformService = {
    isPlatformBrowser: vi.fn(),
};

const setupService = (
    isBrowser: boolean,
    navigatorLanguages?: readonly string[],
    navigatorLanguage?: string,
) => {
    mockPlatformService.isPlatformBrowser.mockReturnValue(isBrowser);

    if (isBrowser) {
        Object.defineProperty(globalThis, 'navigator', {
            value: {
                languages: navigatorLanguages ?? [],
                language: navigatorLanguage ?? 'fr-FR',
            },
            configurable: true,
        });
    }

    return TestBed.configureTestingModule({
        providers: [
            I18nService,
            { provide: TranslateService, useValue: mockTranslateService },
            { provide: PlatformService, useValue: mockPlatformService },
            {
                provide: StorageService,
                useValue: {
                    getItem: vi.fn(),
                    setItem: vi.fn(),
                },
            },
        ],
    }).inject(I18nService);
};

describe('I18nService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        TestBed.resetTestingModule();
    });

    describe('initialization', () => {
        it('should register supported languages and set french as fallback', () => {
            setupService(false);

            expect(mockTranslateService.addLangs).toHaveBeenCalledWith(['fr', 'en']);
            expect(mockTranslateService.setFallbackLang).toHaveBeenCalledWith('fr');
        });
    });

    describe('detectLanguage - SSR', () => {
        it('should use french by default when not in browser', () => {
            setupService(false);

            expect(mockTranslateService.use).toHaveBeenCalledWith('fr');
        });
    });

    describe('detectLanguage - browser', () => {
        it('should use first supported language from navigator.languages', () => {
            setupService(true, ['en-US', 'fr-FR']);

            expect(mockTranslateService.use).toHaveBeenCalledWith('en');
        });

        it('should fallback to navigator.language when navigator.languages is empty', () => {
            setupService(true, [], 'fr-FR');

            expect(mockTranslateService.use).toHaveBeenCalledWith('fr');
        });

        it('should fallback to french when no browser language matches supported languages', () => {
            setupService(true, ['de-DE', 'es-ES'], 'de-DE');

            expect(mockTranslateService.use).toHaveBeenCalledWith('fr');
        });
    });

    describe('initLanguage', () => {
        it('should set french translation only when english is not provided', () => {
            const service = setupService(false);
            const fr = { hello: 'Bonjour' };

            service.initLanguage(fr);

            expect(mockTranslateService.setTranslation).toHaveBeenCalledWith('fr', fr);
            expect(mockTranslateService.setTranslation).toHaveBeenCalledTimes(1);
        });

        it('should set both translations when english is provided', () => {
            const service = setupService(false);
            const fr = { hello: 'Bonjour' };
            const en = { hello: 'Hello' };

            service.initLanguage(fr, en);

            expect(mockTranslateService.setTranslation).toHaveBeenCalledWith('fr', fr);
            expect(mockTranslateService.setTranslation).toHaveBeenCalledWith('en', en);
        });
    });

    describe('switchLanguage', () => {
        it('should switch to the given language', () => {
            const service = setupService(false);

            service.switchLanguage('en');

            expect(mockTranslateService.use).toHaveBeenLastCalledWith('en');
        });
    });
});
