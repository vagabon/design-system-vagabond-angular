import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DsvAvatarComponent } from '@ng-vagabond-lab/ng-dsv/ds/avatar';

@Component({
    selector: 'dsv-card',
    imports: [CommonModule, DsvAvatarComponent],
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    host: {
        class: 'dsv-card',
    },
})
export class DsvCardComponent {
    avatar = input<string>();
    titleText = input<string>('');
    subtitle = input<string>('');
    image = input<string>();
    alt = input<string>();
}
