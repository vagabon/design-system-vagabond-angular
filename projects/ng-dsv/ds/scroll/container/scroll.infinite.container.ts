import { Component, inject, input, output } from '@angular/core';
import { ScrollService } from '@ng-vagabond-lab/ng-dsv/base';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';

export const SCROLL_BOTTOM_MIN = 100;

@Component({
  selector: 'dsv-scroll-infinite',
  imports: [],
  templateUrl: './scroll.infinite.container.html',
  styleUrls: ['./scroll.infinite.container.scss'],
})
export class ScrollInfiniteContainer {
  platformService = inject(PlatformService);
  scrollService = inject(ScrollService);

  class = input<string>('infinite-scroll');

  callback = output<void>();

  doScroll() {
    if (this.platformService.isPlatformBrowser()) {
      const divScroll = document.getElementsByClassName(this.class())?.[0];
      const scrollClientHeight = divScroll?.scrollTop + divScroll?.clientHeight;
      const distanceToBottom = divScroll?.scrollHeight - scrollClientHeight;
      this.scrollService.saveScroll(divScroll?.scrollTop);
      this.scrollService.scroll.set(divScroll?.scrollTop);
      if (distanceToBottom < SCROLL_BOTTOM_MIN) {
        this.callback.emit();
      }
    }
  }
}
