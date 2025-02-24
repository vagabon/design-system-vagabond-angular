import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { MenuService } from '../../public-api';

@Component({
  selector: 'dsv-menu-button',
  standalone: true,
  imports: [CommonModule, DsvButtonComponent],
  templateUrl: './menu.button.component.html',
  styleUrls: ['./menu.button.component.scss'],
})
export class DsvMenuButtonComponent {
  constructor(private readonly menuService: MenuService) {}

  doToogleMenu() {
    this.menuService.toogleMenu();
  }
}
