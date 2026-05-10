import { CommonModule } from '@angular/common';
import { Component, effect, inject, output } from '@angular/core';
import { ID } from '@ng-vagabond-lab/ng-dsv/api';
import { DsvModalAlertComponent, DsvModalButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/modal';
import { RouterInternalPipe } from '@ng-vagabond-lab/ng-dsv/router';
import { AuthGoogleService, AuthService } from '../public-api';

@Component({
    selector: 'dsv-auth',
    imports: [CommonModule, DsvModalButtonComponent, DsvModalAlertComponent, RouterInternalPipe],
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    readonly authService = inject(AuthService);
    readonly authGoogleService = inject(AuthGoogleService);

    readonly callbackInitMember = output<ID>();
    readonly callbackLogout = output<void>();

    constructor() {
        effect(() => {
            if (this.authService.isRefreshTokenLoaded()) {
                this.authGoogleService.initGoogleAuth('google-signin-button');
            }
        });
        effect(() => {
            if (this.authService.userConnected() === null) {
                this.authGoogleService.loginWithGoogle();
            } else {
                this.callbackInitMember.emit(this.authService.userConnected()?.id);
            }
        });
    }

    logout(): void {
        this.authService.logout();
        this.callbackLogout.emit();
    }
}
