import {
  Component,
  effect,
  input,
  output,
  OutputEmitterRef,
  signal,
} from '@angular/core';
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
      this.isDelete.set(
        this.delete['listeners' as keyof OutputEmitterRef<void>]?.length > 0,
      );
    });
  }

  doDelete() {
    this.delete.emit();
  }
}
