import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeSwitchService } from '../service/dsv.theme.switch.service';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';

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
  themeSwitchService = inject(ThemeSwitchService);

  switchTheme() {
    this.themeSwitchService.switchTheme();
  }

  isLightMode() {
    return this.themeSwitchService.themeMode() === 'light';
  }
}
