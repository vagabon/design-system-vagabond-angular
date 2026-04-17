import { inject, Injectable } from '@angular/core';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { AuthService } from './auth.service';

declare const google: any;

@Injectable({
    providedIn: 'root',
})
export class AuthGoogleService {
    private readonly authService = inject(AuthService);
    private readonly environmentService = inject(EnvironmentService);

    initGoogleAuth(googleButtonid: string = 'google-signin-button') {
        google.accounts.id.initialize({
            client_id: this.environmentService.env()?.GOOGLE_CLIENT_ID,
            callback: this.handleCredentialResponse.bind(this),
        });
        google.accounts.id.renderButton(document.getElementById(googleButtonid)!, {
            theme: 'outline',
            size: 'medium',
            type: 'icon',
        });
    }

    handleCredentialResponse(response: { credential: string }) {
        this.authService.googleLogin(response.credential);
    }

    loginWithGoogle() {
        google.accounts.id.prompt();
    }
}
