import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PlatformService {
    readonly platformId = inject(PLATFORM_ID);

    isPlatformBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }
}
