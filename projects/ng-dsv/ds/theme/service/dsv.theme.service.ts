import { inject, Injectable, signal } from '@angular/core';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';

export type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  platformService = inject(PlatformService);
  storageService = inject(StorageService);

  themeMode = signal<ThemeMode>(
    (this.storageService.getItem('theme') as ThemeMode) ?? 'light'
  );

  constructor() {
    if (this.platformService.isPlatformBrowser()) {
      let html = document.getElementsByTagName('body')[0];
      html.classList.add(this.themeMode());
    }
  }

  switchTheme() {
    if (this.platformService.isPlatformBrowser()) {
      let html = document.getElementsByTagName('body')[0];
      html.classList.remove(this.themeMode());

      let newMode: ThemeMode = this.themeMode() === 'dark' ? 'light' : 'dark';
      this.themeMode.set(newMode);
      this.storageService.setItem('theme', newMode);
      html.classList.add(newMode);
    }
  }
}
