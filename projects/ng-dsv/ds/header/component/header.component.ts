import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import {
  DsvMenuButtonComponent,
  MenuService,
} from '@ng-vagabond-lab/ng-dsv/ds/menu';

@Component({
  selector: 'dsv-header',
  standalone: true,
  imports: [CommonModule, DsvMenuButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class DsvHeaderComponent {
  img = input<string>();
  title = input<string>('');
  withMenu = input<boolean>(true);

  constructor(
    private readonly router: Router,
    private readonly menuService: MenuService
  ) {}

  doToogleMenu() {
    this.menuService.toogleMenu();
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
