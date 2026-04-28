import { signal, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { lastValueFrom, Observable } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthService } from '../public-api';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
    let isRefreshTokenLoaded: WritableSignal<boolean>;
    let hasRole: ReturnType<typeof vi.fn>;
    let createUrlTree: ReturnType<typeof vi.fn>;

    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;

    const runGuard = (role: string) =>
        TestBed.runInInjectionContext(() => {
            const obs = authGuard(role)(mockRoute, mockState) as Observable<unknown>;
            return lastValueFrom(obs);
        });

    beforeEach(() => {
        hasRole = vi.fn();
        createUrlTree = vi.fn((path) => path);
        isRefreshTokenLoaded = signal(false);

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        isRefreshTokenLoaded,
                        isPlatformBrowser: vi.fn().mockReturnValue(true),
                        hasRole,
                    },
                },
                {
                    provide: RouterService,
                    useValue: {
                        router: { createUrlTree },
                    },
                },
            ],
        });
    });

    it('when refresh is loaded and user has role, then allows access', async () => {
        hasRole.mockReturnValue(true);
        isRefreshTokenLoaded.set(true);

        const result = await runGuard('ADMIN');
        expect(result).toBe(true);
        expect(hasRole).toHaveBeenCalledWith('ADMIN');
        expect(createUrlTree).not.toHaveBeenCalled();
    });

    it('when refresh is loaded and user lacks role, then redirects to access-denied', async () => {
        hasRole.mockReturnValue(false);
        isRefreshTokenLoaded.set(true);

        const result = await runGuard('ADMIN');
        expect(result).toEqual(['/access-denied']);
        expect(hasRole).toHaveBeenCalledWith('ADMIN');
        expect(createUrlTree).toHaveBeenCalledWith(['/access-denied']);
    });

    it('when refresh is not loaded then loaded, then waits before checking role', async () => {
        hasRole.mockReturnValue(true);

        const resultPromise = runGuard('ADMIN');
        expect(hasRole).not.toHaveBeenCalled();

        isRefreshTokenLoaded.set(true);
        TestBed.tick();

        const result = await resultPromise;
        expect(result).toBe(true);
        expect(hasRole).toHaveBeenCalledTimes(1);
    });
});
