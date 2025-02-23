import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  isMenuOpen: WritableSignal<boolean> = signal(false);

  toogleMenu() {
    this.isMenuOpen.update((toogle) => !toogle);
  }
}
