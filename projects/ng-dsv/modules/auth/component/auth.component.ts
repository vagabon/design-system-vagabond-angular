import { CommonModule } from '@angular/common';
import { Component, effect, inject, output, signal } from '@angular/core';
import { ID } from '@ng-vagabond-lab/ng-dsv/api';
import { ModalAlertComponent, ModalButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/modal';
import { AuthGoogleService, AuthService } from '../public-api';

@Component({
    selector: 'dsv-auth',
    imports: [CommonModule, ModalButtonComponent, ModalAlertComponent],
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    readonly authService = inject(AuthService);
    readonly authGoogleService = inject(AuthGoogleService);

    callbackInitMember = output<ID>();
    callbackLogout = output<void>();

    initAuth = signal<boolean>(false);

    constructor() {
        effect(() => {
            if (this.authService.apiService.isPlatformBrowser() && !this.initAuth()) {
                this.authGoogleService.initGoogleAuth();
                this.authService.refreshToken();
                this.initAuth.set(true);
            }
        });
        effect(() => {
            if (this.authService.apiService.isPlatformBrowser()) {
                if (this.authService.userConnected() === null) {
                    this.authGoogleService.loginWithGoogle();
                } else {
                    this.callbackInitMember.emit(this.authService.userConnected()?.id);
                }
            }
        });
    }

    logout() {
        this.authService.logout();
        this.callbackLogout.emit();
    }
}
