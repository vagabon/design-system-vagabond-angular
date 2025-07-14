import { inject, Injectable, signal } from '@angular/core';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  platformService = inject(PlatformService);

  suffixe = signal<string>('');

  setItem(key: string, value: unknown): void {
    if (this.platformService.isPlatformBrowser()) {
      localStorage.setItem(key + this.suffixe(), JSON.stringify(value));
    }
  }

  parse(value: string) {
    try {
      return JSON.parse(value);
    } catch (exception) {
      console.error(value, (exception as string).toString().split('\n').slice(0, 3).join('\n'));
      return value;
    }
  }

  getItem<T>(key: string): T | null {
    if (this.platformService.isPlatformBrowser()) {
      const item = localStorage.getItem(key + this.suffixe());
      return item ? this.parse(item) : null;
    }
    return null;
  }

  removeItem(key: string): void {
    if (this.platformService.isPlatformBrowser()) {
      localStorage.removeItem(key + this.suffixe());
    }
  }

  clear(): void {
    if (this.platformService.isPlatformBrowser()) {
      localStorage.clear();
    }
  }
}
