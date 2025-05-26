import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
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
  private readonly router = inject(Router);
  private readonly menuService = inject(MenuService);

  img = input<string>();
  title = input<string>('');
  withMenu = input<boolean>(true);

  doToogleMenu() {
    this.menuService.toogleMenu();
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
