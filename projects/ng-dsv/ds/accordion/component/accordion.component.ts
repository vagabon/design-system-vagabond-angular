import { Component, effect, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'dsv-accordion',
  imports: [TranslatePipe],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class DsvAccordionComponent {
  open = input<boolean>(false);
  titleText = input<string>('');
  color = input<string>('');

  isOpen = signal<boolean>(this.open());

  constructor() {
    effect(() => {
      this.isOpen.set(this.open());
    });
  }

  doToogle() {
    this.isOpen.update((tootle) => !tootle);
  }
}
