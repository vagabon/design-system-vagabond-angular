import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PlatformService {
    private readonly platformId = inject(PLATFORM_ID);

    isPlatformBrowser() {
        return isPlatformBrowser(this.platformId);
    }
}
