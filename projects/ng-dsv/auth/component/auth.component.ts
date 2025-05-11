import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { AuthGoogleService, AuthService } from '../public-api';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, DsvButtonComponent],
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  private readonly authGoogleService = inject(AuthGoogleService);
  protected authService = inject(AuthService);
  private readonly environmentService = inject(EnvironmentService);

  private readonly ssrRendered = signal(false);

  constructor() {
    afterNextRender(() => {
      this.ssrRendered.set(true);
    });
    effect(() => {
      if (this.authService.userConnected() === null) {
        this.ssrRendered() && this.authGoogleService.loginWithGoogle();
      } else {
        //this.memberService.initMember(
        //  this.authService.userConnected()?.user?.id
        //);
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
