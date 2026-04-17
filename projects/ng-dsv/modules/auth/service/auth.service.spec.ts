import { TestBed } from '@angular/core/testing';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserConnectedDto } from '../dto/user.dto';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let apiServiceMock: any;
    let toastServiceMock: any;
    let storageServiceMock: any;

    const mockUser: UserConnectedDto = {
        user: { id: '1', profiles: [] },
    };

    beforeEach(() => {
        apiServiceMock = { post: vi.fn(), info: vi.fn() };
        toastServiceMock = { showToast: vi.fn() };
        storageServiceMock = { setItem: vi.fn(), getItem: vi.fn(), removeItem: vi.fn() };

        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: ApiService, useValue: apiServiceMock },
                { provide: ToastService, useValue: toastServiceMock },
                { provide: StorageService, useValue: storageServiceMock },
            ],
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
            'auth/google-identity-connect',
            { googleToken: 'fake-credential' },
            expect.any(Function),
        );
        expect(storageServiceMock.setItem).toHaveBeenCalledWith('user-connected', JSON.stringify(mockUser));
        expect(service.userConnected()).toEqual(mockUser);
        expect(toastServiceMock.showToast).toHaveBeenCalledWith({
            type: 'success',
            text: 'Connexion réussie',
        });
    });

    it('loginFromCache should read from storage and set userConnected', () => {
        storageServiceMock.getItem.mockReturnValue(JSON.stringify(mockUser));

        const result = service.loginFromCache();

        expect(storageServiceMock.getItem).toHaveBeenCalledWith('user-connected');
        expect(service.userConnected()).toEqual(mockUser);
        expect(apiServiceMock.info).toHaveBeenCalledWith('userConnected', mockUser);
        expect(result).toEqual(mockUser);
    });

    it('logout should remove storage and reset userConnected', () => {
        service.userConnected.set(mockUser);

        service.logout();

        expect(storageServiceMock.removeItem).toHaveBeenCalledWith('user-connected');
        expect(service.userConnected()).toBe(null);
        expect(toastServiceMock.showToast).toHaveBeenCalledWith({
            type: 'success',
            text: 'Déconnexion réussie',
        });
    });
});
