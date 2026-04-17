import { TestBed } from '@angular/core/testing';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthGoogleService } from './auth.google.service';
import { AuthService } from './auth.service';

const googleMock = {
    accounts: {
        id: {
            initialize: vi.fn(),
            renderButton: vi.fn(),
            prompt: vi.fn(),
        },
    },
};

(globalThis as any).google = googleMock;

describe('AuthGoogleService', () => {
    let service: AuthGoogleService;
    let authServiceMock: { googleLogin: ReturnType<typeof vi.fn> };
    let environmentServiceMock: { env: ReturnType<typeof vi.fn> };

    beforeEach(() => {
        authServiceMock = { googleLogin: vi.fn() };
        environmentServiceMock = { env: vi.fn().mockReturnValue({ GOOGLE_CLIENT_ID: 'test-client-id' }) };

        vi.clearAllMocks();

        TestBed.configureTestingModule({
            providers: [
                AuthGoogleService,
                { provide: AuthService, useValue: authServiceMock },
                { provide: EnvironmentService, useValue: environmentServiceMock },
            ],
        });

        service = TestBed.inject(AuthGoogleService);
    });

    it('should initialize Google Auth with client id and render button', () => {
        // When
        service.initGoogleAuth('my-button');

        // Then
        expect(googleMock.accounts.id.initialize).toHaveBeenCalledWith({
            client_id: 'test-client-id',
            callback: expect.any(Function),
        });
        expect(googleMock.accounts.id.renderButton).toHaveBeenCalledWith(null, {
            theme: 'outline',
            size: 'medium',
            type: 'icon',
        });
    });

    it('should use default button id when none provided', () => {
        // When
        service.initGoogleAuth();

        // Then
        expect(googleMock.accounts.id.renderButton).toHaveBeenCalledWith(
            document.getElementById('google-signin-button'),
            expect.any(Object),
        );
    });

    it('should call googleLogin with credential when handling credential response', () => {
        // When
        service.handleCredentialResponse({ credential: 'fake-jwt-token' });

        // Then
        expect(authServiceMock.googleLogin).toHaveBeenCalledWith('fake-jwt-token');
    });

    it('should prompt Google account selector on loginWithGoogle', () => {
        // When
        service.loginWithGoogle();

        // Then
        expect(googleMock.accounts.id.prompt).toHaveBeenCalled();
    });
});
