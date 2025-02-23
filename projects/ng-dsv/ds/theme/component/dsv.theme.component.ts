import { Component, HostBinding, Input } from '@angular/core';

export type ThemeType = {
  background?: string;
  backgroundDark?: string;
  text?: string;
  textDark?: string;
  primary?: string;
  secondary?: string;
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
};

@Component({
  selector: 'dsv-theme',
  standalone: true,
  imports: [],
  templateUrl: './dsv.theme.component.html',
  styleUrls: ['./dsv.theme.component.scss'],
})
export class DsvThemeComponent {
  @Input()
  theme: ThemeType = {};

  @HostBinding('style.--background')
  background!: string;

  @HostBinding('style.--background-dark')
  backgroundDark!: string;

  @HostBinding('style.--text')
  text!: string;

  @HostBinding('style.--text-dark')
  textDark!: string;

  @HostBinding('style.--primary')
  primary!: string;

  @HostBinding('style.--secondary')
  secondary!: string;

  @HostBinding('style.--success')
  success!: string;

  @HostBinding('style.--info')
  info!: string;

  @HostBinding('style.--warning')
  warning!: string;

  @HostBinding('style.--error')
  error!: string;

  ngOnInit() {
    this.background = this.theme.background ?? 'rgb(220, 220, 220)';
    this.backgroundDark = this.theme.backgroundDark ?? 'rgb(31, 31, 31)';
    this.text = this.theme.text ?? '#000';
    this.textDark = this.theme.textDark ?? '#fff';
    this.primary = this.theme.primary ?? '#AAA';
    this.secondary = this.theme.secondary ?? '#AAA';
    this.success = this.theme.success ?? '#439746';
    this.info = this.theme.info ?? '#1b78c4';
    this.warning = this.theme.warning ?? '#dca603';
    this.error = this.theme.error ?? '#da1709';
  }
}
