import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  template: '',
})
export abstract class BaseRouteComponent implements OnInit, OnDestroy {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  routeObservable: Subscription | null = null;

  constructor() {}

  ngOnInit() {
    this.routeObservable = this.activatedRoute.params.subscribe((params) => {
      this.ngOnInitAfter(params);
    });
  }

  ngOnDestroy() {
    this.routeObservable?.unsubscribe();
  }

  protected abstract ngOnInitAfter(params: Params): void;
}
