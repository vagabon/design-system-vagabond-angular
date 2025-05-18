import { CommonModule } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';

@Component({
  selector: 'dsv-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class DsvAccordionComponent {
  open = input<boolean>(false);
  title = input<string>('');
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
