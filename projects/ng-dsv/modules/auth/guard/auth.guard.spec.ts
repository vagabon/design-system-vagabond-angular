import { createEnvironmentInjector, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/modules/auth';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
    let mockPlatformService: { isPlatformBrowser: ReturnType<typeof vi.fn> };
    let mockAuthService: { userConnected: ReturnType<typeof vi.fn>; loginFromCache: ReturnType<typeof vi.fn> };
    let mockRouter: { navigate: ReturnType<typeof vi.fn> };
    let injector: EnvironmentInjector;

    beforeEach(() => {
        mockPlatformService = {
            isPlatformBrowser: vi.fn(),
        };

        mockAuthService = {
            userConnected: vi.fn(),
            loginFromCache: vi.fn(),
        };

        mockRouter = {
            navigate: vi.fn(),
        };

        injector = createEnvironmentInjector(
            [
                { provide: PlatformService, useValue: mockPlatformService },
                { provide: AuthService, useValue: mockAuthService },
                { provide: Router, useValue: mockRouter },
            ],
            null as any
        );

        mockPlatformService.isPlatformBrowser.mockReturnValue(true);
    });

    function createRoute(role?: string): ActivatedRouteSnapshot {
        return {
            data: role ? { role } : {},
        } as ActivatedRouteSnapshot;
    }

    const mockState = {} as RouterStateSnapshot;

    it('should return true if user has required role', () => {
        mockAuthService.userConnected.mockReturnValue({
            user: { profiles: [{ name: 'ADMIN' }] as any },
        });

        const result = runInInjectionContext(injector, () => authGuard(createRoute('ADMIN'), mockState));
        expect(result).toBe(true);
    });

    it('should return false and warn if no role is provided in route', () => {
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });

        const result = runInInjectionContext(injector, () => authGuard(createRoute(), mockState));
        expect(result).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith('No role specified in route data.');
    });

    it('should return false and redirect if user lacks the role', () => {
        mockAuthService.userConnected.mockReturnValue({});

        const result = runInInjectionContext(injector, () => authGuard(createRoute('ADMIN'), mockState));
        expect(result).toBe(false);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
});