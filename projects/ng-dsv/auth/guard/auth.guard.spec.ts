import { createEnvironmentInjector, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/auth';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
    let mockAuthService: jasmine.SpyObj<AuthService>;
    let mockRouter: jasmine.SpyObj<Router>;
    let injector: EnvironmentInjector;

    beforeEach(() => {
        mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['userConnected']);
        mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);


        injector = createEnvironmentInjector([
            { provide: AuthService, useValue: mockAuthService },
            { provide: Router, useValue: mockRouter }
        ],
            null as any);
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
