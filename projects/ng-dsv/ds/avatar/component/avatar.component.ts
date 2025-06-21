import {
  Component,
  effect,
  HostBinding,
  HostListener,
  input,
  output,
  signal
} from '@angular/core';
import { isCallback } from '@ng-vagabond-lab/ng-dsv/base';
import { BaseColorComponent } from '@ng-vagabond-lab/ng-dsv/ds/color';

@Component({
  selector: 'dsv-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class DsvAvatarComponent extends BaseColorComponent {
  avatar = input<string>('');
  callback = output<void>();

  avatarLetter = signal<string>('');
  isImage = signal<boolean>(false);
  isCallback = signal<boolean>(false);

  constructor() {
    super();
    effect(() => {
      this.isImage.set(this.avatar().startsWith('http'));
      this.avatarLetter.set(this.avatar().substring(0, 1).toUpperCase() ?? '?');
      this.isCallback.set(isCallback(this.callback));
    });
  }

  @HostBinding('class')
  get hostClasses(): string {
    const classes: string[] = [this.color()];
    this.isCallback() && classes.push('callback');
    return this.getClasses('dsv-avatar', classes);
  }

  @HostListener('click')
  onClick() {
    this.isCallback() && this.callback?.emit();
  }
}
