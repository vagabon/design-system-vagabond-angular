import { CommonModule } from '@angular/common';
import { Component, input, output, OutputEmitterRef } from '@angular/core';
import { ColorType } from '@ng-vagabond-lab/ng-dsv/type';

@Component({
  selector: 'dsv-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class DsvAvatarComponent {
  avatar = input<string>('');
  color = input<ColorType>('primary');
  callback = output<void>();

  isImage() {
    return this.avatar().startsWith('http');
  }

  isCallback() {
    const listeners =
      this.callback['listeners' as keyof OutputEmitterRef<void>];
    return listeners?.length > 0;
  }

  showAvatar() {
    return this.avatar().substring(0, 1).toUpperCase();
  }

  triggerEvent() {
    this.callback?.emit();
  }
}
