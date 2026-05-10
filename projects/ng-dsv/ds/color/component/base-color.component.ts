import { Directive, input, signal } from '@angular/core';
import { ButtonVariantType, ButtonWidthType, ColorType } from '@ng-vagabond-lab/ng-dsv/type';

@Directive()
export abstract class DsvBaseColorComponent {
    readonly color = input<ColorType>('primary');
    readonly variant = input<ButtonVariantType>('contained');
    readonly width = input<ButtonWidthType>('small');
    readonly show = input<boolean>(true);
    readonly fullwidth = input<boolean>(false);

    readonly classes = signal<string>('');

    setClasses(name: string, add: string[] = []): void {
        this.classes.set(this.getClasses(name, add));
    }

    getClasses(name: string, add: string[] = []): string {
        const classes = [name, this.variant(), this.color(), this.width(), ...add];
        this.fullwidth() && classes.push('fullwidth');
        return classes.join(' ');
    }
}
