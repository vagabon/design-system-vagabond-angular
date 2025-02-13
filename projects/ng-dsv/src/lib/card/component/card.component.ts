import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DsvAvatarComponent } from '../../avatar/public-api';

@Component({
  selector: 'dsv-card',
  standalone: true,
  imports: [CommonModule, DsvAvatarComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class DsvCardComponent {
  @Input() avatar?: string;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() image: string = '';
  @Input() alt: string = '';
}
