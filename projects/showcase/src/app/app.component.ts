import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiSdkComponent } from '@ng-vagabond-lab/ng-dsv';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { DsvContainerComponent } from '@ng-vagabond-lab/ng-dsv/ds/container';
import { DsvHeaderComponent } from '@ng-vagabond-lab/ng-dsv/ds/header';
import { DsvItemComponent } from '@ng-vagabond-lab/ng-dsv/ds/item';
import { DsvMenuComponent } from '@ng-vagabond-lab/ng-dsv/ds/menu';
import { DsvThemeComponent } from '@ng-vagabond-lab/ng-dsv/ds/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UiSdkComponent,
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
  title = 'showcase';
}
