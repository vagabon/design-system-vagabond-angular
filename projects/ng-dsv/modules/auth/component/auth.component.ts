import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  inject,
  output
} from '@angular/core';
import { ID } from '@ng-vagabond-lab/ng-dsv/api';
import {
  ModalAlertComponent,
  ModalButtonComponent,
} from '@ng-vagabond-lab/ng-dsv/ds/modal';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { AuthGoogleService, AuthService } from '../public-api';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, ModalButtonComponent, ModalAlertComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  readonly authGoogleService = inject(AuthGoogleService);
  readonly authService = inject(AuthService);
  readonly environmentService = inject(EnvironmentService);
  readonly platformService = inject(PlatformService);

  readonly initMember = output<ID>();

  constructor() {
    effect(() => {
      if (this.environmentService.env() && this.platformService.isPlatformBrowser()) {
        this.authService.loginFromCache();
        this.authGoogleService.initGoogleAuth();
        if (this.authService.userConnected() === null) {
          this.authGoogleService.loginWithGoogle();
        } else {
          this.initMember.emit(this.authService.userConnected()?.user?.id);
        }
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
