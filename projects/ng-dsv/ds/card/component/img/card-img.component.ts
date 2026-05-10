import { Component, input } from '@angular/core';

@Component({
    selector: 'dsv-card-img',
    imports: [],
    templateUrl: './card-img.component.html',
    styleUrl: './card-img.component.scss',
})
export class DsvCardImgComponent {
    readonly src = input<string>('');
    readonly alt = input<string>('description');
}
