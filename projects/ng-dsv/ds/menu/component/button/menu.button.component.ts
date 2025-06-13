import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { MenuService } from '../../public-api';

@Component({
  selector: 'dsv-menu-button',
  imports: [CommonModule, DsvButtonComponent],
  templateUrl: './menu.button.component.html',
  styleUrls: ['./menu.button.component.scss'],
})
export class DsvMenuButtonComponent {
  private readonly menuService = inject(MenuService);

  doToogleMenu() {
    this.menuService.toogleMenu();
  }
}
