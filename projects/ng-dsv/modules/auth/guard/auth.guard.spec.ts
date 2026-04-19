import { signal, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService, UserDto } from '@ng-vagabond-lab/ng-dsv/modules/auth';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { lastValueFrom, Observable } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
    let mockPlatformService: { isPlatformBrowser: ReturnType<typeof vi.fn> };
    let mockAuthService: {
        userConnected: WritableSignal<UserDto | null>;
        loginFromCache: ReturnType<typeof vi.fn>;
    };
    let mockRouter: { navigate: ReturnType<typeof vi.fn> };

    beforeEach(() => {
        mockPlatformService = {
            isPlatformBrowser: vi.fn(),
        };

        mockAuthService = {
            userConnected: signal(null),
            loginFromCache: vi.fn(),
        };

        mockRouter = {
            navigate: vi.fn(),
        };

        mockPlatformService.isPlatformBrowser.mockReturnValue(true);

        TestBed.configureTestingModule({
            providers: [
                { provide: PlatformService, useValue: mockPlatformService },
                { provide: AuthService, useValue: mockAuthService },
                { provide: Router, useValue: mockRouter },
            ],
        });
    });

    function createRoute(role?: string): ActivatedRouteSnapshot {
        return {
            data: role ? { role } : {},
        } as ActivatedRouteSnapshot;
    }

    const mockState = {} as RouterStateSnapshot;

    it('should return true if user has required role', async () => {
        const resultPromise = TestBed.runInInjectionContext(() => {
            const obs = authGuard(createRoute('ADMIN'), mockState) as Observable<boolean>;
            return lastValueFrom(obs);
        });

        mockAuthService.userConnected.set({ profiles: [{ name: 'ADMIN' }] as any });
        TestBed.tick();

        const result = await resultPromise;
        expect(result).toBe(true);
    });

    it('should return false and warn if no role is provided in route', () => {
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        const result = TestBed.runInInjectionContext(() => authGuard(createRoute(), mockState));

        expect(result).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith('No role specified in route data.');
    });

    it('should return false and redirect if user lacks the role', async () => {
        mockAuthService.userConnected.set(null);

        const resultPromise = TestBed.runInInjectionContext(() => {
            const obs = authGuard(createRoute('ADMIN'), mockState) as Observable<boolean>;
            return lastValueFrom(obs);
        });

        TestBed.tick();
        mockAuthService.userConnected.set(null);

        const result = await resultPromise;
        expect(result).toBe(false);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should return false and redirect if user is null', async () => {
        mockAuthService.userConnected.set(null);

        const resultPromise = TestBed.runInInjectionContext(() => {
            const obs = authGuard(createRoute('ADMIN'), mockState) as Observable<boolean>;
            return lastValueFrom(obs);
        });

        TestBed.tick();
        mockAuthService.userConnected.set(null);

        const result = await resultPromise;
        expect(result).toBe(false);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
});
