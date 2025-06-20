import {
  Component,
  effect,
  inject,
  input,
  output,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { isCallback } from '@ng-vagabond-lab/ng-dsv/base';

@Component({
  selector: 'dsv-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class DsvItemComponent {
  private readonly router = inject(Router);

  icon = input<string>('');
  text = input<string>('');
  url = input<string>();
  small = input<boolean>(true);

  callback = output<void>();

  isCallback = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.isCallback.set(isCallback(this.callback));
    });
  }

  doClick() {
    if (this.url()) {
      this.router.navigate([this.url()]);
    }
    this.isCallback() && this.callback.emit();
  }
}
