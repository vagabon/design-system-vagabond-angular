import { Injectable, signal } from '@angular/core';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { UserConnectedDto } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userConnected = signal<UserConnectedDto | null>(null);

  constructor(private readonly apiService: ApiService) {}

  googleLogin(credential: string) {
    this.apiService.post<UserConnectedDto>(
      'auth/google-identity-connect',
      {
        googleToken: credential,
      },
      (data) => {
        localStorage?.setItem('user-connected', JSON.stringify(data));
        this.userConnected.set(data);
      }
    );
  }

  loginFromCache() {
    const userConnected =
      typeof window !== 'undefined' &&
      JSON.parse(localStorage?.getItem('user-connected')!);
    this.userConnected.set(userConnected);
    console.info('userConnected', userConnected);
    return userConnected;
  }

  logout() {
    localStorage?.removeItem('user-connected');
    this.userConnected.set(null);
  }
}
