import { Component, effect, input, output } from '@angular/core';
import { DsvBaseColorComponent } from '@ng-vagabond-lab/ng-dsv/ds/color';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonRippleDirective } from '../directive/button-riddle.directive';

@Component({
    selector: 'dsv-button',
    imports: [TranslatePipe, ButtonRippleDirective],
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class DsvButtonComponent extends DsvBaseColorComponent {
    readonly libelle = input<string>('');
    readonly icon = input<string>('');
    readonly iconEnd = input<string>('');
    readonly disabled = input<boolean>(false);
    readonly noHover = input<boolean>(false);
    readonly type = input<string>('button');
    readonly prevent = input<boolean>(true);

    readonly callback = output<void>();

    constructor() {
        super();
        effect(() => {
            const classes: string[] = [];
            this.icon() && classes.push('icon');
            this.libelle() !== '' && classes.push('padding');
            this.noHover() && classes.push('no-hover');

            this.setClasses('dsv-button', classes);
        });
    }

    doClick(event: Event): void {
        if (this.prevent() && this.type() !== 'submit') {
            event.stopPropagation();
            event.preventDefault();
        }
        !this.disabled() && this.callback.emit();
    }
}
