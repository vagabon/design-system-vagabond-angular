import { CommonModule } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';

const COLUMN_CLASS = 'column';
const DSV_CONTAINER = 'dsv-container';

@Component({
  selector: 'dsv-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class DsvContainerComponent {
  private readonly storageService = inject(StorageService);

  column = input<boolean>(false);

  constructor() {
    effect(() => {
      this.storageService.isPlatformBrowser() &&
        this.column() &&
        document
          .getElementsByTagName(DSV_CONTAINER)[0]
          .classList.add(COLUMN_CLASS);
    });
  }
}
