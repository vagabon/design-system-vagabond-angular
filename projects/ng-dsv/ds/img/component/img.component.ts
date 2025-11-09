import { Component, computed, input, signal } from '@angular/core';
import { DsvSekeletonComponent } from '@ng-vagabond-lab/ng-dsv/ds/skeleton';

@Component({
  selector: 'dsv-img',
  imports: [DsvSekeletonComponent],
  templateUrl: './img.component.html',
  styleUrl: './img.component.scss'
})
export class DsvImgComponent {

  src = input.required<string>();
  alt = input<string>('description');
  empty = input<string>('images/empty.svg');

  width = input<number>(500);
  height = input<number>(750);

  load = signal<boolean>(false);
  error = signal<boolean>(false);

  aspectRatio = computed<string>(() => this.width() + '/' + this.height());

  doLoad() {
    this.load.set(true);
  }


  onImageError() {
    this.error.set(true);
  }
}
