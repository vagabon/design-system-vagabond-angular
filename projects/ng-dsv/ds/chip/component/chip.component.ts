import {
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';
import { isCallback } from '@ng-vagabond-lab/ng-dsv/base';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { BaseColorComponent } from '@ng-vagabond-lab/ng-dsv/ds/color';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'dsv-chip',
  imports: [DsvButtonComponent, TranslatePipe],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class DsvChipComponent extends BaseColorComponent {
  text = input<string>('');

  delete = output<void>();

  isDelete = signal<boolean>(false);

  constructor() {
    super();
    effect(() => {
      this.isDelete.set(isCallback(this.delete));

      this.text();
      const classes: string[] = [this.isDelete() ? 'with-delete' : ''];
      this.setClasses('dsv-chip', classes);
    });
  }

  doDelete() {
    this.delete.emit();
  }
}
