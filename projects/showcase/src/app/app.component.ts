import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiSdkComponent } from '@ng-vagabond-lab/ng-dsv';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UiSdkComponent, DsvButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'showcase';
}
