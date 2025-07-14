import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { DsvContainerComponent } from '@ng-vagabond-lab/ng-dsv/ds/container';
import { DsvThemeSwitchComponent } from '@ng-vagabond-lab/ng-dsv/ds/theme';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { MenuService } from '../public-api';

@Component({
  selector: 'dsv-menu',
  imports: [CommonModule, DsvThemeSwitchComponent, DsvContainerComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class DsvMenuComponent {
  readonly platformService = inject(PlatformService);
  readonly menuService = inject(MenuService);
  readonly elementRef = inject(ElementRef);

  showFooter = input<boolean>(true);

  constructor() {
    effect(() => {
      if (this.platformService.isPlatformBrowser()) {
        const menu = document.getElementsByTagName('dsv-menu')[0];
        const collapse = document.getElementById('collapse');
        if (this.menuService.isMenuOpen()) {
          menu?.classList?.add('open');
          collapse?.classList.add('show');
        } else {
          menu?.classList?.remove('open');
          collapse?.classList.remove('show');
        }
      }

      this.menuService.isMenuOpen() &&
        document.getElementsByTagName('dsv-container')[0].classList.add('show');
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (
      this.platformService.isPlatformBrowser() &&
      this.menuService.isMenuOpen() &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.menuService.toogleMenu();
    }
  }
}
