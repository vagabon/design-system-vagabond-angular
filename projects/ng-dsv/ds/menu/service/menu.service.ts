import { Injectable, signal } from '@angular/core';
import { BaseService } from '@ng-vagabond-lab/ng-dsv/base';

@Injectable({
  providedIn: 'root',
})
export class MenuService extends BaseService {
  isMenuOpen = signal<boolean>(false);

  toogleMenu() {
    this.isMenuOpen.update((toogle) => !toogle);
  }
}
