import { CommonModule } from '@angular/common';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalAlertComponent, ModalButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/modal';
import { provideTranslateService } from '@ngx-translate/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthGoogleService, AuthService } from '../public-api';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    let authServiceMock: {
        userConnected: ReturnType<typeof vi.fn>;
        loginFromCache: ReturnType<typeof vi.fn>;
        isRefreshTokenLoaded: ReturnType<typeof signal>;
        logout: ReturnType<typeof vi.fn>;
        apiService: { isPlatformBrowser: ReturnType<typeof vi.fn> };
        refreshToken: ReturnType<typeof vi.fn>;
    };
    let authGoogleServiceMock: {
        loginWithGoogle: ReturnType<typeof vi.fn>;
        initGoogleAuth: ReturnType<typeof vi.fn>;
    };

    beforeEach(async () => {
        authServiceMock = {
            userConnected: vi.fn().mockReturnValue(null),
            loginFromCache: vi.fn(),
            isRefreshTokenLoaded: signal(true),
            logout: vi.fn(),
            apiService: { isPlatformBrowser: vi.fn().mockReturnValue(true) },
            refreshToken: vi.fn(),
        };

        authGoogleServiceMock = {
            loginWithGoogle: vi.fn(),
            initGoogleAuth: vi.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [CommonModule, AuthComponent, ModalButtonComponent, ModalAlertComponent],
            providers: [
                provideZonelessChangeDetection(),
                provideTranslateService(),
                { provide: AuthService, useValue: authServiceMock },
                { provide: AuthGoogleService, useValue: authGoogleServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should render Google Sign-In button when user not connected', () => {
        authServiceMock.userConnected.mockReturnValue(null);
        fixture.detectChanges();

        const googleButton = fixture.debugElement.query(By.css('#google-signin-button'));
        expect(googleButton).toBeTruthy();
        expect(googleButton.nativeElement.classList.contains('hidden')).toBe(false);
    });

    it('should hide Google Sign-In button when user is connected', () => {
        authServiceMock.userConnected.mockReturnValue({ user: { id: '1' } });
        fixture.detectChanges();

        const googleButton = fixture.debugElement.query(By.css('#google-signin-button'));
        expect(googleButton.nativeElement.classList.contains('hidden')).toBe(true);
    });

    it('should call logout on logout callback', () => {
        authServiceMock.userConnected.mockReturnValue({ user: { id: '1' } });
        fixture.detectChanges();

        component.logout();
        expect(authServiceMock.logout).toHaveBeenCalled();
    });

    it('should trigger loginWithGoogle effect if user not connected', () => {
        authServiceMock.userConnected.mockReturnValue(null);

        fixture.detectChanges();

        expect(authGoogleServiceMock.loginWithGoogle).toHaveBeenCalled();
        expect(authGoogleServiceMock.initGoogleAuth).toHaveBeenCalled();
    });
});
