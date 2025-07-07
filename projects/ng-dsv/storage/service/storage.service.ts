import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly platformId = inject(PLATFORM_ID);

  suffixe = signal<string>('');

  isPlatformBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  setItem(key: string, value: unknown): void {
    if (isPlatformBrowser(this.platformId)) {
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
    if (isPlatformBrowser(this.platformId)) {
      const item = localStorage.getItem(key + this.suffixe());
      return item ? this.parse(item) : null;
    }
    return null;
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key + this.suffixe());
    }
  }

  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}
