import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  template: '',
})
export abstract class BaseRouteComponent {
  activatedRoute = inject<ActivatedRoute>(ActivatedRoute);

  routeParams = toSignal(this.activatedRoute.params);

  routeObservable: Subscription | null = null;
}
