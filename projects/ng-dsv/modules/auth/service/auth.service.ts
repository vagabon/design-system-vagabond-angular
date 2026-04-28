import { Injectable, signal } from '@angular/core';
import { JSONValue } from '@ng-vagabond-lab/ng-dsv/api';
import { BaseApiService } from '@ng-vagabond-lab/ng-dsv/base/service';
import { UserDto, UserSigninDto } from '../dto/user.dto';
import { hasRole } from '../public-api';

@Injectable({
    providedIn: 'root',
})
export class AuthService extends BaseApiService {
    userConnected = signal<UserDto | null>(null);
    userToken = signal<string>('');
    isRefreshTokenLoaded = signal<boolean>(false);

    initUser(user: UserSigninDto | null = null) {
        this.userConnected.set(user?.user ?? null);
        this.userToken.set(user?.jwt ?? '');
        this.isRefreshTokenLoaded.set(true);
    }

    googleLogin(credential: string) {
        this.apiService.post<JSONValue, UserSigninDto>(
            '/auth/google-identity-connect',
            {
                googleToken: credential,
            },
            (data) => {
                this.initUser(data);
                this.apiService.toastService.showToast({
                    type: 'success',
                    text: 'Connexion réussie',
                });
            },
            true,
        );
    }

    refreshToken() {
        this.apiService.post<UserSigninDto>(
            '/auth/refresh-token',
            {},
            (data) => this.initUser(data),
            true,
            () => this.initUser(),
        );
    }

    logout(showToast: boolean = true) {
        this.apiService.post<UserSigninDto>(
            '/auth/logout',
            {},
            () => {
                this.initUser();
                if (showToast) {
                    this.apiService.toastService.showToast({
                        type: 'success',
                        text: 'Déconnexion réussie',
                    });
                }
            },
            true,
        );
    }

    hasRole(role: string): boolean {
        const user = this.userConnected() ?? null;
        return !!user && hasRole(role, user.profiles);
    }

    canFetch(ssr: boolean = true) {
        return (
            (ssr && !this.isPlatformBrowser()) || (this.isPlatformBrowser() && this.isRefreshTokenLoaded())
        );
    }
}
