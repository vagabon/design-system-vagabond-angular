import { Component, input } from '@angular/core';

@Component({
  selector: 'app-linear-progress',
  templateUrl: './linear-progress.component.html',
  styleUrls: ['./linear-progress.component.scss'],
})
export class LinearProgressComponent {
  load = input<boolean>(false);
  value = input<number>(0);
  indeterminate = input<boolean>(true);
}
