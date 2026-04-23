import { TestBed } from '@angular/core/testing';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/modules/auth';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BaseMainContainer } from './base.main.container';

const mockAuthService = {
    isPlatformBrowser: vi.fn().mockReturnValue(true),
    refreshToken: vi.fn(),
};

const mockRouterService = {};

class TestMainComponent extends BaseMainContainer {}

describe('BaseMainContainer', () => {
    let component: TestMainComponent;

    beforeEach(() => {
        vi.clearAllMocks();
        mockAuthService.isPlatformBrowser.mockReturnValue(true);

        TestBed.configureTestingModule({
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: RouterService, useValue: mockRouterService },
            ],
        });

        component = TestBed.runInInjectionContext(() => new TestMainComponent());
        TestBed.tick();
    });

    it('when platform is browser and initRefreshToken is false, then refreshToken should be called', () => {
        expect(mockAuthService.refreshToken).toHaveBeenCalledOnce();
    });
});
