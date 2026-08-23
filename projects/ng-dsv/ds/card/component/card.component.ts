import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'dsv-card',
    imports: [CommonModule],
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    host: {
        class: 'dsv-card',
        '[class.border]': 'border()',
    },
})
export class DsvCardComponent {
    readonly border = input<boolean>(false);
}
