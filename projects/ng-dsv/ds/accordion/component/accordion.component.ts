import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'dsv-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class DsvAccordionComponent {
  @Input() open: boolean = false;
  @Input() title: string = '';
  @Input() color: string = '';

  isOpen: WritableSignal<boolean> = signal(this.open);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      this.isOpen.set(Boolean(changes['open'].currentValue === 'true'));
    }
  }

  doToogle() {
    this.isOpen.update((tootle) => !tootle);
  }
}
