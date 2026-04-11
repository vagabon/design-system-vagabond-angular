import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'dsv-file-show',
  templateUrl: './file.show.component.html',
})
export class FileShowComponent {
  url = input<string>('');
  src = input.required<string>();
  alt = input<string>('Exemple du dsv file show');

  fileUrl = computed<string>(() =>
    this.url() + '/file/download?fileName=' + this.src(),
  );

}
