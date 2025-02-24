import { Injectable, signal, WritableSignal } from '@angular/core';
import { BaseService } from '@ng-vagabond-lab/ng-dsv/base';

@Injectable({
  providedIn: 'root',
})
export class MenuService extends BaseService {
  isMenuOpen: WritableSignal<boolean> = signal(false);

  toogleMenu() {
    this.isMenuOpen.update((toogle) => !toogle);
  }
}
