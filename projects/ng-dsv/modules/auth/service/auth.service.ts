import { inject, Injectable, signal } from '@angular/core';
import { ApiService, JSONValue } from '@ng-vagabond-lab/ng-dsv/api';
import { UserDto, UserSigninDto } from '../dto/user.dto';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    readonly apiService = inject(ApiService);

    userConnected = signal<UserDto | null>(null);
    userToken = signal<string>('');

    initUser(user: UserSigninDto | null = null) {
        this.userConnected.set(user?.user ?? null);
        this.userToken.set(user?.jwt ?? '');
    }

    googleLogin(credential: string) {
        this.apiService.post<JSONValue, UserSigninDto>(
            'auth/google-identity-connect',
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
        this.apiService.post<UserSigninDto>('auth/refresh-token', {}, (data) => this.initUser(data), true);
    }

    logout(showToast: boolean = true) {
        this.apiService.post<UserSigninDto>(
            'auth/logout',
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
}
