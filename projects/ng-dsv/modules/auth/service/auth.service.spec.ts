import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserSigninDto } from '../dto/user.dto';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let apiServiceMock: any;

    const mockUser: UserSigninDto = {
        user: { id: '1', profiles: [] },
    };

    beforeEach(() => {
        apiServiceMock = {
            userConnected: signal(null),
            post: vi.fn(),
            info: vi.fn(),
            initUser: vi.fn(),
            toastService: { showToast: vi.fn() },
        };

        TestBed.configureTestingModule({
            providers: [AuthService, { provide: ApiService, useValue: apiServiceMock }],
        });

        service = TestBed.inject(AuthService);
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
        expect(service.userConnected()).toBe(null);
    });

    it('googleLogin should call apiService.post and set userConnected', () => {
        apiServiceMock.post.mockImplementation((url: string, payload: any, cb: Function) => cb(mockUser));

        service.googleLogin('fake-credential');

        expect(apiServiceMock.post).toHaveBeenCalledWith(
            '/auth/google-identity-connect',
            { googleToken: 'fake-credential' },
            expect.any(Function),
            true,
        );
        expect(service.userConnected()).toEqual(mockUser.user!);
        expect(apiServiceMock.toastService.showToast).toHaveBeenCalledWith({
            type: 'success',
            text: 'Connexion réussie',
        });
    });

    it('logout should remove storage and reset userConnected', () => {
        service.userConnected.set(mockUser.user!);
        apiServiceMock.post.mockImplementation((url: string, payload: any, cb: Function) => cb());

        service.logout();

        expect(service.userConnected()).toBe(null);
        expect(apiServiceMock.toastService.showToast).toHaveBeenCalledWith({
            type: 'success',
            text: 'Déconnexion réussie',
        });
    });
});
