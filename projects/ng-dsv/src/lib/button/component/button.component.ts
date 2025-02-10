import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type ButtonColorType =
  | 'premium'
  | 'success'
  | 'info'
  | 'warning'
  | 'error';
export type ButtonWidthType = 'small' | 'medium' | 'large';
export type ButtonVariantType = 'text' | 'outlined' | 'contained';

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
  @Input() iconEnd: string = '';
  @Input() width: ButtonWidthType = 'medium';
  @Input() variant: ButtonVariantType = 'contained';
  @Input() fullwidth: boolean = false;
  @Input() show: boolean = true;
  @Input() disabled: boolean = false;
}
