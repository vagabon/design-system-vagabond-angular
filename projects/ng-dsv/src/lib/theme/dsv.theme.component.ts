import { Component, HostBinding, Input } from '@angular/core';

export type Theme = {
  primary: string;
  text: string;
};

@Component({
  selector: 'dsv-theme',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrls: ['./dsv.theme.component.scss'],
})
export class DsvThemeComponent {
  @Input()
  theme!: Theme;

  @HostBinding('style.--primaryy')
  background = 'blue';

  @HostBinding('style.--textt')
  text = 'red';

  ngOnInit() {
    console.log('init');
    this.background = this.theme.primary;
    this.text = this.theme.text;
  }
}
