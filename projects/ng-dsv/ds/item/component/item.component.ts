import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dsv-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class DsvItemComponent {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() url!: string;

  constructor(private router: Router) {}

  doClick() {
    this.url && this.router.navigate([this.url]);
  }
}
