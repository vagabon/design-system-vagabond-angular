import { effect, inject } from '@angular/core';
import { ScrollService } from '../public-api';

export abstract class BaseScrollComponent {
  readonly scrollService = inject(ScrollService);

  constructor() {

    effect(() => {
    });
  }

  loadMore() {
    if (!this.scrollService.getlocked()) {
      this.scrollService.doBlocked();
      this.doLoad();
      this.scrollService.doBlockedWithTimeout(false, 500);
    }
  }

  abstract doLoad(): void;
}
