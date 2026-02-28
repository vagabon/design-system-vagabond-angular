import { createEnvironmentInjector, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/modules/auth';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
    let mockplatformService: jest.Mocked<PlatformService>;
    let mockAuthService: jest.Mocked<AuthService>;
    let mockRouter: jest.Mocked<Router>;
    let injector: EnvironmentInjector;

    beforeEach(() => {
        mockplatformService = {
            isPlatformBrowser: jest.fn(),
        } as unknown as jest.Mocked<PlatformService>;

        mockAuthService = {
            userConnected: jest.fn(),
            loginFromCache: jest.fn(),
        } as unknown as jest.Mocked<AuthService>;

        mockRouter = {
            navigate: jest.fn(),
        } as unknown as jest.Mocked<Router>;

        injector = createEnvironmentInjector([
            { provide: PlatformService, useValue: mockplatformService },
            { provide: AuthService, useValue: mockAuthService },
            { provide: Router, useValue: mockRouter }
        ], null as any);

        mockplatformService.isPlatformBrowser.mockReturnValue(true);
    });

    function createRoute(role?: string): ActivatedRouteSnapshot {
        return {
            data: role ? { role } : {},
        } as ActivatedRouteSnapshot;
    }

    const mockState = {} as RouterStateSnapshot;

    it('should return true if user has required role', () => {
        mockAuthService.userConnected.mockReturnValue({
            user: { profiles: [{ name: 'ADMIN' }] as any }
        });

        const result = runInInjectionContext(injector, () =>
            authGuard(createRoute('ADMIN'), mockState)
        );

        expect(result).toBe(true);
    });

    it('should return false and warn if no role is provided in route', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });

        const result = runInInjectionContext(injector, () =>
            authGuard(createRoute(), mockState)
        );

        expect(result).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith('No role specified in route data.');
    });

    it('should return false and redirect if user lacks the role', () => {
        mockAuthService.userConnected.mockReturnValue({});

        const result = runInInjectionContext(injector, () =>
            authGuard(createRoute('ADMIN'), mockState)
        );

        expect(result).toBe(false);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
});