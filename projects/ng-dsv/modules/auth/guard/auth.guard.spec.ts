import { createEnvironmentInjector, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/modules/auth';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
    let mockplatformService: jasmine.SpyObj<PlatformService>;
    let mockAuthService: jasmine.SpyObj<AuthService>;
    let mockRouter: jasmine.SpyObj<Router>;
    let injector: EnvironmentInjector;

    beforeEach(() => {
        mockplatformService = jasmine.createSpyObj<PlatformService>('PlatformService', ['isPlatformBrowser']);
        mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['userConnected', 'loginFromCache']);
        mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

        injector = createEnvironmentInjector([
            { provide: PlatformService, useValue: mockplatformService },
            { provide: AuthService, useValue: mockAuthService },
            { provide: Router, useValue: mockRouter }
        ], null as any);

        mockplatformService.isPlatformBrowser.and.returnValue(true);
    });

    function createRoute(role?: string): ActivatedRouteSnapshot {
        return {
            data: role ? { role } : {},
        } as ActivatedRouteSnapshot;
    }

    const mockState = {} as RouterStateSnapshot;

    it('should return true if user has required role', () => {
        mockAuthService.userConnected.and.returnValue({
            user: { profiles: [{ name: 'ADMIN' }] as any }
        });

        const result = runInInjectionContext(injector, () =>
            authGuard(createRoute('ADMIN'), mockState)
        );

        expect(result).toBeTrue();
    });

    it('should return false and warn if no role is provided in route', () => {
        const consoleSpy = spyOn(console, 'warn');

        const result = runInInjectionContext(injector, () =>
            authGuard(createRoute(), mockState)
        );

        expect(result).toBeFalse();
        expect(consoleSpy).toHaveBeenCalledWith('No role specified in route data.');
    });

    it('should return false and redirect if user lacks the role', () => {
        mockAuthService.userConnected.and.returnValue({
        });

        const result = runInInjectionContext(injector, () =>
            authGuard(createRoute('ADMIN'), mockState)
        );

        expect(result).toBeFalse();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
});
