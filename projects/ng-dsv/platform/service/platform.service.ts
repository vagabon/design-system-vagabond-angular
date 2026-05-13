import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map, startWith } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PlatformService {
    readonly platformId = inject(PLATFORM_ID);

    width = this.isPlatformBrowser()
        ? toSignal(
              fromEvent(window, 'resize').pipe(
                  startWith(null),
                  map(() => window.innerWidth),
              ),
              { initialValue: window.innerWidth },
          )
        : signal(1024);

    isMobile = computed(() => this.width() < 768);
    isTablet = computed(() => this.width() >= 768 && this.width() < 1024);
    isDesktop = computed(() => this.width() >= 1024);

    isPlatformBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }
}
