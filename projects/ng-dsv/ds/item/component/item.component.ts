import {
  Component,
  inject,
  input,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { Router } from '@angular/router';

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

  isCallback() {
    const listeners =
      this.callback['listeners' as keyof OutputEmitterRef<void>];
    return listeners?.length > 0;
  }

  doClick() {
    if (this.url()) {
      this.router.navigate([this.url()]);
    }
    this.isCallback() && this.callback.emit();
  }
}
