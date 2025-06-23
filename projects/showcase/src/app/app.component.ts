import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DsvButtonComponent } from '../../../ng-dsv/ds/button';
import { DsvContainerComponent } from '../../../ng-dsv/ds/container';
import { DsvHeaderComponent } from '../../../ng-dsv/ds/header';
import { DsvItemComponent } from '../../../ng-dsv/ds/item';
import { DsvMenuComponent } from '../../../ng-dsv/ds/menu';
import { DsvThemeComponent } from '../../../ng-dsv/ds/theme';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    DsvButtonComponent,
    DsvThemeComponent,
    DsvHeaderComponent,
    DsvContainerComponent,
    DsvMenuComponent,
    DsvItemComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
