import { Component, input, output } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';

@Component({
    selector: 'dsv-paginate',
    imports: [DsvButtonComponent],
    templateUrl: './paginate.component.html',
    styleUrls: ['./paginate.component.scss'],
})
export class DsvPaginateComponent {
    readonly page = input.required<number>();
    readonly max = input.required<number>();

    readonly callback = output<number>();

    gotoPage(page: number): void {
        this.callback.emit(page);
    }
}
