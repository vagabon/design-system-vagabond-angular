import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonColorType } from '../../button/public-api';

@Component({
  selector: 'dsv-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class DsvAvatarComponent {
  @Input() avatar: string = '';
  @Input() color: ButtonColorType = 'primary';
  @Input() callback?: () => void;

  isImage() {
    return this.avatar.startsWith('http');
  }

  showAvatar() {
    return this.avatar.substring(0, 1).toUpperCase();
  }

  triggerEvent() {
    if (this.callback) {
      this.callback();
    }
  }
}
