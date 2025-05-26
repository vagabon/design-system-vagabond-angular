import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  scrolls = signal<Map<string, number>>(new Map());

  saveScroll(scrollTop: number) {
    this.scrolls.update((value) => {
      value.set(location.href, scrollTop);
      return value;
    });
  }

  getScroll() {
    return this.scrolls().get(location.href);
  }
}
