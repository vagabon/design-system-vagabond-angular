import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ColorType } from '@ng-vagabond-lab/ng-dsv/type';

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
  libelle = input<string>('');
  color = input<ColorType>('primary');
  icon = input<string>('');
  iconEnd = input<string>('');
  width = input<ButtonWidthType>('medium');
  variant = input<ButtonVariantType>('contained');
  fullwidth = input<boolean>(false);
  show = input<boolean>(true);
  disabled = input<boolean>(false);
  noHover = input<boolean>(false);
  type = input<string>('button');

  prevent = input<boolean>(true);

  callback = output<void>();

  doClick(event: Event) {
    if (this.prevent() && this.type() !== 'submit') {
      event.stopPropagation();
      event.preventDefault();

    }
    !this.disabled() && this.callback.emit();
  }
}
