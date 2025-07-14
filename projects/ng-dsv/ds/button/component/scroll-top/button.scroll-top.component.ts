import { Component, effect, inject, input, signal } from '@angular/core';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { DsvButtonComponent } from '../button.component';

@Component({
  selector: 'app-scroll-top-button',
  imports: [DsvButtonComponent],
  templateUrl: './button.scroll-top.component.html',
  styleUrls: ['./button.scroll-top.component.scss'],
})
export class ButtonScrollTopComponent {
  readonly platformService = inject(PlatformService);

  scroll = input<number>(0);

  show = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.show.set(this.scroll() > 400);
    });
  }

  scrollToTop() {
    if (this.platformService.isPlatformBrowser()) {
      const scrolls = document.getElementsByClassName('scroll');
      Array.from(scrolls).forEach((scroll) => {
        scroll?.scrollTo(0, 0);
      });
    }
  }
}
