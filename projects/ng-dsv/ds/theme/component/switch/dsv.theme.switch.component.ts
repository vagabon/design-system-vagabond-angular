import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { ThemeService } from '../../public-api';

export type Theme = {
  primary: string;
  text: string;
};

@Component({
  selector: 'dsv-theme-switch',
  standalone: true,
  imports: [CommonModule, DsvButtonComponent],
  templateUrl: `./dsv.theme.switch.component.html`,
})
export class DsvThemeSwitchComponent {
  constructor(private readonly themeService: ThemeService) {}

  switchTheme() {
    this.themeService.switchTheme();
  }

  isLightMode() {
    return this.themeService.themeMode() === 'light';
  }
}
