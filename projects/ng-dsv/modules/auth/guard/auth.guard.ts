import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { filter, map, of, take, tap, timeout } from 'rxjs';
import { AuthService, hasRole } from '../public-api';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const platformService = inject(PlatformService);

    if (!platformService.isPlatformBrowser()) {
        return true;
    }

    const authService = inject(AuthService);
    const router = inject(Router);

    const requiredRole = route.data['role'];

    if (!requiredRole) {
        console.warn('No role specified in route data.');
        return false;
    }

    return toObservable(authService.userConnected).pipe(
        filter((user) => user !== null),
        take(1),
        map((user) => hasRole(requiredRole, user?.profiles)),
        tap((hasRole) => {
            if (!hasRole) {
                router.navigate(['/']);
            }
        }),
        timeout({
            each: 500,
            with: () => {
                router.navigate(['/']);
                return of(false);
            },
        }),
    );
};
