import { Component, computed, input, signal } from '@angular/core';
import { DsvSekeletonComponent } from '@ng-vagabond-lab/ng-dsv/ds/skeleton';

@Component({
    selector: 'dsv-img',
    imports: [DsvSekeletonComponent],
    templateUrl: './img.component.html',
    styleUrl: './img.component.scss',
})
export class DsvImgComponent {
    readonly src = input.required<string>();
    readonly alt = input<string>('description');
    readonly empty = input<string>('images/empty.svg');

    readonly width = input<number>(500);
    readonly height = input<number>(750);

    readonly load = signal<boolean>(false);
    readonly error = signal<boolean>(false);

    readonly aspectRatio = computed<string>(() => this.width() + '/' + this.height());

    doLoad(): void {
        this.load.set(true);
    }

    onImageError(): void {
        this.error.set(true);
    }
}
