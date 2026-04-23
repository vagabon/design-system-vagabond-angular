import { signal } from '@angular/core';

// TODO : checker les inject dans les composants ???
export abstract class BaseComponent {
    loaded = signal(false);
}
