import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, Service } from '@angular/core';

@Service()
export class AnalyticsService {
    readonly platformId = inject(PLATFORM_ID);

    init(analyticsId?: string): void {
        if (!isPlatformBrowser(this.platformId) || !analyticsId) {
            return;
        }

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
        document.head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '${analyticsId}');
        `;
        document.head.appendChild(inlineScript);
    }
}
