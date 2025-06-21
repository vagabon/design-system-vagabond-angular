import { Component, effect, input, output } from '@angular/core';
import { BaseColorComponent } from '@ng-vagabond-lab/ng-dsv/ds/color';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'dsv-button',
  imports: [TranslatePipe],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class DsvButtonComponent extends BaseColorComponent {
  libelle = input<string>('');
  icon = input<string>('');
  iconEnd = input<string>('');
  disabled = input<boolean>(false);
  noHover = input<boolean>(false);
  type = input<string>('button');

  prevent = input<boolean>(true);

  callback = output<void>();

  constructor() {
    super();
    effect(() => {
      const classes: string[] = [];
      this.icon() && classes.push('icon');
      this.libelle() !== '' && classes.push('padding');
      this.noHover() && classes.push('no-hover');

      this.setClasses('dsv-button', classes);
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
