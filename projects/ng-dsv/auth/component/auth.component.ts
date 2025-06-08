import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  Component,
  effect,
  inject,
  output,
  signal,
} from '@angular/core';
import { ID } from '@ng-vagabond-lab/ng-dsv/api';
import { ModalAlertComponent, ModalButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/modal';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { AuthGoogleService, AuthService } from '../public-api';

@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    ModalButtonComponent,
    ModalAlertComponent
  ],
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  readonly authGoogleService = inject(AuthGoogleService);
  readonly authService = inject(AuthService);
  readonly environmentService = inject(EnvironmentService);

  readonly initMember = output<ID>();

  readonly ssrRendered = signal(false);

  constructor() {
    afterNextRender(() => {
      this.ssrRendered.set(true);
    });
    effect(() => {
      if (this.authService.userConnected() === null) {
        this.ssrRendered() && this.authGoogleService.loginWithGoogle();
      } else {
        this.initMember.emit(this.authService.userConnected()?.user?.id);
      }
    });
    effect(() => {
      if (this.environmentService.env() && this.ssrRendered()) {
        this.authService.loginFromCache();
        this.authGoogleService.initGoogleAuth();
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
