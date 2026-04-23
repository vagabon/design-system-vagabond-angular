import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

const COLUMN_CLASS = 'column';

@Component({
    selector: 'dsv-container',
    imports: [CommonModule],
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss'],
    host: {
        '[class]': 'class()',
    },
})
export class DsvContainerComponent {
    column = input<boolean>(false);

    class = computed(() => {
        const classes: string[] = ['dsv-container'];
        this.column() && classes.push(COLUMN_CLASS);
        return classes.join(' ');
    });
}
