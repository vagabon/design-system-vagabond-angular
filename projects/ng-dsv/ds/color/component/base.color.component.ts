import { Component, input, signal } from "@angular/core";
import { ButtonVariantType, ButtonWidthType, ColorType } from "@ng-vagabond-lab/ng-dsv/type";

@Component({
    selector: 'base-color',
    imports: [],
    template: ''
})
export abstract class BaseColorComponent {

    color = input<ColorType>('primary');
    variant = input<ButtonVariantType>('contained');
    width = input<ButtonWidthType>('small');
    show = input<boolean>(true);
    fullwidth = input<boolean>(false);

    classes = signal<string>('');

    setClasses(name: string, add: string[] = []) {
        this.classes.set(this.getClasses(name, add));
    }

    getClasses(name: string, add: string[] = []) {
        const classes = [
            name,
            this.variant(),
            this.color(),
            this.width(),
            ...add
        ];
        this.fullwidth() && classes.push('fullwidth');
        return classes.join(' ');
    }
}