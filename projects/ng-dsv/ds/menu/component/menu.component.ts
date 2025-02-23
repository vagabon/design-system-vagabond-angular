import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { DsvContainerComponent } from '@ng-vagabond-lab/ng-dsv/ds/container';
import { DsvThemeSwitchComponent } from '@ng-vagabond-lab/ng-dsv/ds/theme';
import { MenuService } from '../public-api';

@Component({
  selector: 'dsv-menu',
  standalone: true,
  imports: [CommonModule, DsvThemeSwitchComponent, DsvContainerComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class DsvMenuComponent implements OnInit {
  @Input() showFooter: boolean = true;

  constructor(
    private menuService: MenuService,
    private elementRef: ElementRef
  ) {
    effect(() => {
      const menu = document.getElementsByTagName('dsv-menu')[0];
      const collapse = document.getElementById('collapse');
      if (this.menuService.isMenuOpen()) {
        menu?.classList?.add('open');
        collapse?.classList.add('show');
      } else {
        menu?.classList?.remove('open');
        collapse?.classList.remove('show');
      }
    });
  }

  ngOnInit() {
    this.menuService.isMenuOpen() &&
      document.getElementsByTagName('dsv-container')[0].classList.add('show');
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (
      this.menuService.isMenuOpen() &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.menuService.toogleMenu();
    }
  }
}
