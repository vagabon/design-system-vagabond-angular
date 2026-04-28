import { effect, inject, Injectable, signal } from '@angular/core';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { AuthService } from './auth.service';

declare const google: any;

@Injectable({
    providedIn: 'root',
})
export class AuthGoogleService {
    readonly authService = inject(AuthService);
    readonly environmentService = inject(EnvironmentService);

    readonly googleIds = signal<Map<string, boolean>>(new Map());

    readonly init = signal<boolean>(false);

    constructor() {
        effect(() => {
            if (!this.init() && this.authService.isPlatformBrowser()) {
                this.init.set(true);
                google.accounts.id.initialize({
                    client_id: this.environmentService.env()?.GOOGLE_CLIENT_ID,
                    callback: this.handleCredentialResponse.bind(this),
                });
            }
        });
    }

    initGoogleAuth(googleButtonid: string = crypto.randomUUID()) {
        if (this.googleIds().get(googleButtonid) || !this.authService.isPlatformBrowser()) {
            return;
        }
        const element = document.getElementById(googleButtonid);
        if (element) {
            this.googleIds.update((ids) => {
                ids.set(googleButtonid, true);
                return ids;
            });
            google.accounts.id.renderButton(document.getElementById(googleButtonid)!, {
                theme: 'outline',
                size: 'medium',
                type: 'icon',
            });
        }
    }

    handleCredentialResponse(response: { credential: string }) {
        this.authService.googleLogin(response.credential);
    }

    loginWithGoogle() {
        if (this.authService.isRefreshTokenLoaded() && this.authService.userConnected() === null) {
            google.accounts.id.prompt();
        }
    }
}
