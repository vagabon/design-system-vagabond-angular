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

  initGoogleAuth() {
    google.accounts.id.initialize({
      client_id: this.environmentService.env()?.GOOGLE_CLIENT_ID,
      callback: this.handleCredentialResponse.bind(this),
    });
    google.accounts.id.renderButton(
      document.getElementById('google-signin-button')!,
      {
        theme: 'outline',
        size: 'medium',
        type: 'icon',
      }
    );
  }

  handleCredentialResponse(response: { credential: string }) {
    this.authService.googleLogin(response.credential);
  }

  decodeJwtToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  loginWithGoogle() {
    google?.accounts.id.prompt();
  }
}
