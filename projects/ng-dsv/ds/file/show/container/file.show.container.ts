import { Component, inject, input, signal } from '@angular/core';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';

@Component({
  selector: 'dsv-file-show',
  templateUrl: './file.show.container.html',
})
export class FileShowContainer {
  apiService = inject(ApiService);

  src = input.required<string>();
  alt = input<string>('Apperçu du Meme');

  fileUrl = signal<string>(
    this.apiService.baseUrl + '/file/download?fileName=',
  );
}
