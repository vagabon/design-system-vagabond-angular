import { Component, input } from '@angular/core';

@Component({
    selector: 'dsv-linear-progress',
    templateUrl: './linear-progress.component.html',
    styleUrls: ['./linear-progress.component.scss'],
})
export class LinearProgressComponent {
    readonly load = input<boolean>(false);
    readonly value = input<number>(0);
    readonly indeterminate = input<boolean>(true);
}
