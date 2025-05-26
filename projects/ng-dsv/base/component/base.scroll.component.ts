import { Component, inject } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { filter, map } from 'rxjs';
import { ScrollService } from '../service/scroll.service';

@Component({
  template: '',
})
export abstract class BaseScrollComponent {
  environmentService = inject(EnvironmentService);
  scrollService = inject(ScrollService);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event): event is Scroll => event instanceof Scroll),
        map((event: Scroll) => event.position)
      )
      .subscribe(() => {
        const divScroll = document.getElementById('scroll');
        divScroll?.scrollTo(0, this.scrollService.getScroll() ?? 0);
        setTimeout(() => {
          divScroll?.scrollTo(0, this.scrollService.getScroll() ?? 0);
        }, 500);
      });
  }

  onScroll(scrollName: string = 'scroll') {
    const divScroll = document.getElementById(scrollName);
    const distanceToBottom =
      divScroll?.scrollHeight! -
      (divScroll?.scrollTop! + divScroll?.clientHeight!);
    this.environmentService.isScrollDown.set(distanceToBottom < 50);
    this.scrollService.saveScroll(divScroll?.scrollTop!);
  }
}
