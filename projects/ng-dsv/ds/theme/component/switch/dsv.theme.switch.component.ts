import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { ThemeService } from '../../public-api';

export type Theme = {
  primary: string;
  text: string;
};

@Component({
  selector: 'dsv-theme-switch',
  imports: [CommonModule, DsvButtonComponent],
  templateUrl: `./dsv.theme.switch.component.html`,
})
export class DsvThemeSwitchComponent {
  private readonly themeService = inject(ThemeService);

  switchTheme() {
    this.themeService.switchTheme();
  }

  isLightMode() {
    return this.themeService.themeMode() === 'light';
  }
}
