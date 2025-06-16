import {
  Component,
  effect,
  HostBinding,
  HostListener,
  input,
  output,
  OutputEmitterRef,
  signal,
} from '@angular/core';
import { ColorType } from '@ng-vagabond-lab/ng-dsv/type';

@Component({
  selector: 'dsv-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class DsvAvatarComponent {
  avatar = input<string>('');
  color = input<ColorType>('primary');
  callback = output<void>();

  avatarLetter = signal<string>('');
  isImage = signal<boolean>(false);
  isCallback = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.isImage.set(this.avatar().startsWith('http'));
      this.avatarLetter.set(this.avatar().substring(0, 1).toUpperCase() ?? '?');
      const listeners =
        this.callback['listeners' as keyof OutputEmitterRef<void>];
      this.isCallback.set(listeners?.length > 0);
    });
  }

  @HostBinding('class')
  get hostClasses(): string {
    const classes: string[] = ['dsv-avatar', this.color()];
    this.isCallback() && classes.push('callback');
    return classes.join(' ');
  }

  @HostListener('click')
  onClick() {
    if (this.isCallback()) {
      this.callback?.emit();
    }
  }
}
