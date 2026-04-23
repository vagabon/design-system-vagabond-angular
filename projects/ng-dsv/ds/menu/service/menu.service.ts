import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    isMenuOpen = signal<boolean>(false);

    toogleMenu() {
        this.isMenuOpen.update((toogle) => !toogle);
    }

    closeMenu() {
        this.isMenuOpen.set(false);
    }
}
