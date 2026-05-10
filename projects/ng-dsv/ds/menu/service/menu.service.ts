import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    readonly isMenuOpen = signal<boolean>(false);

    toogleMenu(): void {
        this.isMenuOpen.update((toogle) => !toogle);
    }

    closeMenu(): void {
        this.isMenuOpen.set(false);
    }
}
