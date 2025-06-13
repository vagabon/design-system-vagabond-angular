import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DsvAvatarComponent } from '@ng-vagabond-lab/ng-dsv/ds/avatar';

@Component({
  selector: 'dsv-card',
  imports: [CommonModule, DsvAvatarComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class DsvCardComponent {
  avatar = input<string>();
  title = input<string>('');
  subtitle = input<string>('');
  image = input<string>();
  alt = input<string>();
}
