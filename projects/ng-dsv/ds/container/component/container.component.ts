import { CommonModule } from '@angular/common';
import { Component, HostBinding, input } from '@angular/core';

const COLUMN_CLASS = 'column';

@Component({
  selector: 'dsv-container',
  imports: [CommonModule],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class DsvContainerComponent {

  column = input<boolean>(false);

  @HostBinding('class')
  get hostClasses(): string {
    const classes: string[] = ['dsv-container'];
    this.column() && classes.push(COLUMN_CLASS);
    return classes.join(' ');
  }
}
