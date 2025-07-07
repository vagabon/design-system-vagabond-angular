import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseSeoContainer } from './base.seo.container';

export abstract class BaseRouteComponent extends BaseSeoContainer {
  activatedRoute = inject<ActivatedRoute>(ActivatedRoute);

  routeParams = toSignal(this.activatedRoute.params);

  routeObservable: Subscription | null = null;
}
