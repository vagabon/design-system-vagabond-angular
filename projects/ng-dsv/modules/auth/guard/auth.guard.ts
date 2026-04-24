import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { filter, map, take } from 'rxjs';
import { AuthService } from '../public-api';

export const authGuard = (role: string): CanActivateFn => {
    return () => {
        const authService = inject(AuthService);
        const router = inject(RouterService).router;

        if (!authService.isPlatformBrowser()) {
            return true;
        }

        const requiredRole = role.toUpperCase();

        return toObservable(authService.loadRefreshToken).pipe(
            filter((loaded) => loaded),
            take(1),
            map(() => {
                if (authService.hasRole(requiredRole)) {
                    return true;
                }
                return router.createUrlTree(['/access-denied']);
            }),
        );
    };
};
