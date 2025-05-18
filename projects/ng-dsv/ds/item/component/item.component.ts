import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dsv-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class DsvItemComponent {
  icon = input<string>('');
  text = input<string>('');
  url = input<string>();
  small = input<boolean>(false);

  constructor(private readonly router: Router) {}

  doClick() {
    this.url() && this.router.navigate([this.url()]);
  }
}
