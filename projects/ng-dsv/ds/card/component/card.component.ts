import { CommonModule } from '@angular/common';
import { Component, HostBinding, input } from '@angular/core';
import { DsvAvatarComponent } from '@ng-vagabond-lab/ng-dsv/ds/avatar';

@Component({
  selector: 'dsv-card',
  imports: [CommonModule, DsvAvatarComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class DsvCardComponent {
  avatar = input<string>();
  titleText = input<string>('');
  subtitle = input<string>('');
  image = input<string>();
  alt = input<string>();

  @HostBinding('class')
  get hostClasses(): string {
    const classes: string[] = ['dsv-card'];
    return classes.join(' ');
  }
}
