import { effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { ScrollService } from '../public-api';

export abstract class BaseAppScrollComponent {
  environmentService = inject(EnvironmentService);
  apiService = inject(ApiService);
  scrollService = inject(ScrollService);

  scroll = signal<number>(0);

  load = signal<boolean>(false);

  constructor() {
    inject(Router)
      .events
      .subscribe((res) => {
        const divScrolls = document.getElementsByClassName('scroll');
        Array.from(divScrolls).forEach(scroll => {
          scroll?.scrollTo(0, this.scrollService.getScroll() ?? 0);
        });
        this.scrollService.scroll.set(this.scrollService.getScroll() ?? 0);
      });

    effect(() => {
      if (this.environmentService.env()) {
        const apiUrl = this.environmentService.env()?.API_URL!;
        this.apiService.setBaseUrl(apiUrl);
        this.load.set(true);
      }
    });
  }

  doScroll() {
    const divScroll = document.getElementsByClassName('scroll')?.[0];
    if (document.getElementsByClassName('scroll').length === 1) {
      this.scrollService.saveScroll(divScroll.scrollTop);
      this.scrollService.scroll.set(divScroll.scrollTop);
    }
  }
}
