import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'dsv-file-show',
    templateUrl: './file-show.component.html',
})
export class DsvFileShowComponent {
    readonly url = input<string>('');
    readonly src = input.required<string>();
    readonly alt = input<string>('Exemple du dsv file show');

    readonly fileUrl = computed<string>(() => this.url() + '/file/download?fileName=' + this.src());
}
