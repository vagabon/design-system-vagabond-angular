import { Component, input, output } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';

@Component({
  selector: 'app-paginate-component',
  imports: [DsvButtonComponent],
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss'],
})
export class PaginateComponent {
  page = input.required<number>();
  max = input.required<number>();
  nb = input.required<number>();

  callback = output<number>();

  gotoPage(page: number) {
    this.callback.emit(page);
  }
}
