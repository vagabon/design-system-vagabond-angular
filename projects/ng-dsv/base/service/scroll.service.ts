import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  scrolls = signal<Map<string, number>>(new Map());
  blocked = signal<Map<string, boolean>>(new Map());
  scroll = signal<number>(0);

  saveScroll(scrollTop: number) {
    this.scrolls.update((value) => {
      if (scrollTop !== 0) {
        value.set(location.href, scrollTop);
      }
      return value;
    });
  }

  getScroll() {
    return this.scrolls().get(location.href);
  }

  doBlocked(blocked: boolean = true) {
    this.blocked.update((value) => {
      value.set(location.href, blocked);
      return value;
    });
  }

  doBlockedWithTimeout(blocked: boolean, timeout: number = 1000) {
    setTimeout(() => {
      this.doBlocked(blocked);
    }, timeout);
  }

  getlocked() {
    return this.blocked().get(location.href);
  }
}
