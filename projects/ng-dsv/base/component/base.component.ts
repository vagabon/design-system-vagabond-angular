import { Directive, signal } from '@angular/core';

// TODO : checker les inject dans les composants ???
@Directive()
export abstract class BaseComponent {
    readonly loaded = signal(false);
}
