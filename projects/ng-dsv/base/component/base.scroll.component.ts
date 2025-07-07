import { inject } from '@angular/core';
import { BaseSeoContainer, ScrollService } from '../public-api';

export abstract class BaseScrollComponent extends BaseSeoContainer {
  readonly scrollService = inject(ScrollService);

  loadMore() {
    if (!this.scrollService.getlocked()) {
      this.scrollService.doBlocked();
      this.doLoad();
      this.scrollService.doBlockedWithTimeout(false, 500);
    }
  }

  abstract doLoad(): void;
}
