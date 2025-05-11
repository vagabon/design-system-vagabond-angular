import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly platformId = inject(PLATFORM_ID);

  isPlatformBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  setItem(key: string, value: unknown): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  parse(value: string) {
    try {
      return JSON.parse(value);
    } catch (_) {
      return value;
    }
  }

  getItem<T>(key: string): T | null {
    if (isPlatformBrowser(this.platformId)) {
      const item = localStorage.getItem(key);
      return item ? this.parse(item) : null;
    }
    return null;
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}
