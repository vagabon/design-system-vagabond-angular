import { Directive, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { BaseContainer } from '../base.container';

@Directive()
export abstract class BaseRouteContainer extends BaseContainer {
    readonly activatedRoute = inject<ActivatedRoute>(ActivatedRoute);

    readonly routeParams = toSignal(this.activatedRoute.params);
}
