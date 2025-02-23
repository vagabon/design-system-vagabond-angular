import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dsv-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class DsvContainerComponent {
  @Input() column: boolean = false;

  ngOnInit() {
    this.column &&
      document.getElementsByTagName('dsv-container')[0].classList.add('column');
  }
}
