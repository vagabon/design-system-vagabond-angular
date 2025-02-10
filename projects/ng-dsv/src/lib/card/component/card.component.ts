import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dsv-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class DsvCardComponent {
  @Input()
  title: string = '';
  @Input()
  subtitle: string = '';
  @Input()
  image: string = '';
  @Input()
  alt: string = '';
}
