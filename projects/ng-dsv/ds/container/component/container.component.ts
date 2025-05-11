import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';

@Component({
  selector: 'dsv-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class DsvContainerComponent {
  @Input() column: boolean = false;

  private readonly storageService = inject(StorageService);

  constructor() {}

  ngOnInit() {
    this.storageService.isPlatformBrowser() &&
      this.column &&
      document.getElementsByTagName('dsv-container')[0].classList.add('column');
  }
}
