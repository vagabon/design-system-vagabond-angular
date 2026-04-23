import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { BaseContainer } from '../base.container';

export abstract class BaseRouteContainer extends BaseContainer {
    activatedRoute = inject<ActivatedRoute>(ActivatedRoute);

    routeParams = toSignal(this.activatedRoute.params);
}
