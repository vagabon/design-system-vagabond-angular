import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService, hasRole } from '../public-api';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
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
