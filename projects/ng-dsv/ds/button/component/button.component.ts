import { Component, effect, input, output, signal } from '@angular/core';
import { ColorType } from '@ng-vagabond-lab/ng-dsv/type';
import { TranslatePipe } from '@ngx-translate/core';

export type ButtonWidthType = 'small' | 'medium' | 'large';
export type ButtonVariantType = 'text' | 'outlined' | 'contained';

@Component({
  selector: 'dsv-button',
  imports: [TranslatePipe],
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

  classes = signal<string>('');

  constructor() {
    effect(() => {
      const classes = [
        'dsv-button',
        this.color(),
        this.width(),
        this.variant(),
      ];
      this.icon() && classes.push('icon');
      this.libelle() !== '' && classes.push('padding');
      this.fullwidth() && classes.push('fullwidth');
      this.noHover() && classes.push('no-hover');
      this.classes.set(classes.join(' '));
    });
  }

  doClick(event: Event) {
    if (this.prevent() && this.type() !== 'submit') {
      event.stopPropagation();
      event.preventDefault();
    }
    !this.disabled() && this.callback.emit();
  }
}
