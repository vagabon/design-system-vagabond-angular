import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthGoogleService } from './auth.google.service';
import { AuthService } from './auth.service';

const mockGoogle = {
    accounts: {
        id: {
            initialize: vi.fn(),
            renderButton: vi.fn(),
            prompt: vi.fn(),
        },
    },
};
(globalThis as any).google = mockGoogle;

const mockAuthService = {
    isPlatformBrowser: vi.fn().mockReturnValue(true),
    googleLogin: vi.fn(),
    isRefreshTokenLoaded: vi.fn().mockReturnValue(null),
    userConnected: vi.fn().mockReturnValue(null),
};

const mockEnv = signal({ GOOGLE_CLIENT_ID: 'test-client-id' });
const mockEnvironmentService = {
    env: mockEnv,
};

describe('AuthGoogleService', () => {
    let service: AuthGoogleService;

    beforeEach(() => {
        vi.clearAllMocks();
        mockAuthService.isPlatformBrowser.mockReturnValue(true);
        mockAuthService.isRefreshTokenLoaded.mockReturnValue(null);
        mockAuthService.userConnected.mockReturnValue(null);

        TestBed.configureTestingModule({
            providers: [
                AuthGoogleService,
                { provide: AuthService, useValue: mockAuthService },
                { provide: EnvironmentService, useValue: mockEnvironmentService },
            ],
        });

        service = TestBed.inject(AuthGoogleService);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    describe('constructor effect', () => {
        it('when platform is not browser, then google.accounts.id.initialize should not be called', () => {
            mockAuthService.isPlatformBrowser.mockReturnValue(false);
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                providers: [
                    AuthGoogleService,
                    { provide: AuthService, useValue: mockAuthService },
                    { provide: EnvironmentService, useValue: mockEnvironmentService },
                ],
            });
            const ssrService = TestBed.inject(AuthGoogleService) as any;
            expect(mockGoogle.accounts.id.initialize).not.toHaveBeenCalled();
            expect(ssrService.init()).toBe(false);
        });
    });

    describe('initGoogleAuth()', () => {
        it('when platform is not browser, then renderButton should not be called', () => {
            mockAuthService.isPlatformBrowser.mockReturnValue(false);
            service.initGoogleAuth('btn-1');
            expect(mockGoogle.accounts.id.renderButton).not.toHaveBeenCalled();
        });

        it('when element does not exist in DOM, then renderButton should not be called', () => {
            service.initGoogleAuth('non-existent-id');
            expect(mockGoogle.accounts.id.renderButton).not.toHaveBeenCalled();
        });

        it('when element exists, then renderButton should be called with correct options', () => {
            const el = document.createElement('div');
            el.id = 'btn-google';
            document.body.appendChild(el);

            service.initGoogleAuth('btn-google');

            expect(mockGoogle.accounts.id.renderButton).toHaveBeenCalledWith(el, {
                theme: 'outline',
                size: 'medium',
                type: 'icon',
            });

            document.body.removeChild(el);
        });

        it('when element exists, then googleIds should register the button id', () => {
            const el = document.createElement('div');
            el.id = 'btn-register';
            document.body.appendChild(el);

            service.initGoogleAuth('btn-register');

            expect(service.googleIds().get('btn-register')).toBe(true);

            document.body.removeChild(el);
        });

        it('when button id is already registered, then renderButton should not be called again', () => {
            const el = document.createElement('div');
            el.id = 'btn-duplicate';
            document.body.appendChild(el);

            service.initGoogleAuth('btn-duplicate');
            service.initGoogleAuth('btn-duplicate');

            expect(mockGoogle.accounts.id.renderButton).toHaveBeenCalledOnce();

            document.body.removeChild(el);
        });
    });

    describe('handleCredentialResponse()', () => {
        it('when called with a credential, then authService.googleLogin should be called with it', () => {
            service.handleCredentialResponse({ credential: 'token-abc' });
            expect(mockAuthService.googleLogin).toHaveBeenCalledWith('token-abc');
        });
    });

    describe('loginWithGoogle()', () => {
        it('when refresh token exists and user is not connected, then google.accounts.id.prompt should be called', () => {
            mockAuthService.isRefreshTokenLoaded.mockReturnValue('refresh-token');
            mockAuthService.userConnected.mockReturnValue(null);
            service.loginWithGoogle();
            expect(mockGoogle.accounts.id.prompt).toHaveBeenCalledOnce();
        });

        it('when refresh token is null, then google.accounts.id.prompt should not be called', () => {
            mockAuthService.isRefreshTokenLoaded.mockReturnValue(null);
            service.loginWithGoogle();
            expect(mockGoogle.accounts.id.prompt).not.toHaveBeenCalled();
        });

        it('when user is already connected, then google.accounts.id.prompt should not be called', () => {
            mockAuthService.isRefreshTokenLoaded.mockReturnValue('refresh-token');
            mockAuthService.userConnected.mockReturnValue({ id: 'user-1' });
            service.loginWithGoogle();
            expect(mockGoogle.accounts.id.prompt).not.toHaveBeenCalled();
        });
    });
});
