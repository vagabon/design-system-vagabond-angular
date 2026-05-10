import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'dsv-card',
    imports: [CommonModule],
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    host: {
        class: 'dsv-card',
    },
})
export class DsvCardComponent {}
