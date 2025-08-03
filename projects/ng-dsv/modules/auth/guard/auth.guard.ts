import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { AuthService, hasRole } from '../public-api';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
) => {
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

    authService.loginFromCache();
    const profiles = authService.userConnected()?.user?.profiles;
    if (hasRole(requiredRole, profiles)) {
        return true;
    }

    router.navigate(['/']);
    return false;
};
