import {
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';
import { isCallback } from '@ng-vagabond-lab/ng-dsv/base';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';

@Component({
  selector: 'dsv-chip',
  imports: [DsvButtonComponent],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class DsvChipComponent {
  text = input<string>('');

  delete = output<void>();

  isDelete = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.isDelete.set(isCallback(this.delete));
    });
  }

  doDelete() {
    this.delete.emit();
  }
}
