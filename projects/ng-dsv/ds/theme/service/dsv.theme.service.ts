import { Injectable, signal, WritableSignal } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

console.log('default theme :', localStorage.getItem('theme'));

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeMode: WritableSignal<ThemeMode> = signal(
    (localStorage.getItem('theme') as ThemeMode) ?? 'light'
  );

  constructor() {
    let html = document.getElementsByTagName('body')[0];
    html.classList.add(this.themeMode());
  }

  switchTheme() {
    let html = document.getElementsByTagName('body')[0];
    html.classList.remove(this.themeMode());

    let newMode: ThemeMode = this.themeMode() === 'dark' ? 'light' : 'dark';
    this.themeMode.set(newMode);
    localStorage.setItem('theme', newMode);
    html.classList.add(newMode);
  }
}
