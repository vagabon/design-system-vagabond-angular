import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DsvButtonComponent } from '../../../button/component/button.component';
import { ThemeSwitchService } from '../service/dsv.theme.switch.service';

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
