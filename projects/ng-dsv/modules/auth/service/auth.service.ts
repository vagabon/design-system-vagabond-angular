import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';
import { UserConnectedDto } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiService = inject(ApiService);
  toastService = inject(ToastService);
  storageService = inject(StorageService);

  userConnected = signal<UserConnectedDto | null>(null);

  googleLogin(credential: string) {
    this.apiService.post<UserConnectedDto>(
      'auth/google-identity-connect',
      {
        googleToken: credential,
      },
      (data) => {
        this.storageService.setItem('user-connected', JSON.stringify(data));
        this.userConnected.set(data);
        this.toastService.showToast({
          type: 'success',
          text: 'Connexion réussie',
        });
      }
    );
  }

  loginFromCache() {
    const userConnected =
      typeof window !== 'undefined' &&
      JSON.parse(this.storageService?.getItem('user-connected')!);
    this.userConnected.set(userConnected);
    this.apiService.info('userConnected', userConnected);
    return userConnected;
  }

  logout() {
    this.storageService?.removeItem('user-connected');
    this.userConnected.set(null);
    this.toastService.showToast({
      type: 'success',
      text: 'Déconnexion réussie',
    });
  }
}
