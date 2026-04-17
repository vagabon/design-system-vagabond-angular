import { CommonModule } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalAlertComponent, ModalButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/modal';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
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
        logout: ReturnType<typeof vi.fn>;
    };
    let authGoogleServiceMock: {
        loginWithGoogle: ReturnType<typeof vi.fn>;
        initGoogleAuth: ReturnType<typeof vi.fn>;
    };
    let environmentServiceMock: { env: ReturnType<typeof vi.fn> };

    beforeEach(async () => {
        authServiceMock = {
            userConnected: vi.fn().mockReturnValue(null),
            loginFromCache: vi.fn(),
            logout: vi.fn(),
        };

        authGoogleServiceMock = {
            loginWithGoogle: vi.fn(),
            initGoogleAuth: vi.fn(),
        };

        environmentServiceMock = {
            env: vi.fn().mockReturnValue(true),
        };

        await TestBed.configureTestingModule({
            imports: [CommonModule, AuthComponent, ModalButtonComponent, ModalAlertComponent],
            providers: [
                provideZonelessChangeDetection(),
                provideTranslateService(),
                { provide: AuthService, useValue: authServiceMock },
                { provide: AuthGoogleService, useValue: authGoogleServiceMock },
                { provide: EnvironmentService, useValue: environmentServiceMock },
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

    it('should display profile and logout modal when user is connected', () => {
        authServiceMock.userConnected.mockReturnValue({ user: { id: '1', avatar: 'avatar.png' } });
        fixture.detectChanges();

        const profile = fixture.debugElement.query(By.css('.profile'));
        expect(profile).toBeTruthy();

        const img = profile.query(By.css('img'));
        expect(img.nativeElement.src).toContain('avatar.png');

        const logoutButton = fixture.debugElement.query(By.css('#logout'));
        expect(logoutButton).toBeTruthy();
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
    });

    it('should call loginFromCache and initGoogleAuth if env true and ssrRendered', () => {
        authServiceMock.userConnected.mockReturnValue(null);

        fixture.detectChanges();

        expect(authServiceMock.loginFromCache).toHaveBeenCalled();
        expect(authGoogleServiceMock.initGoogleAuth).toHaveBeenCalled();
    });
});
