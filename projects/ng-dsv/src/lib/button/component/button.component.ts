import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dsv-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class DsvButtonComponent {
  @Input() libelle: string = '';
  @Input() color: string = 'primary';
  @Input() icon: string = '';
}
