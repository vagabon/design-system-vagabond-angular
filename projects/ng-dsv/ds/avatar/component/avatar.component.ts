import { Component, effect, input, output, signal } from '@angular/core';
import { isCallback } from '@ng-vagabond-lab/ng-dsv/base';
import { DsvBaseColorComponent } from '@ng-vagabond-lab/ng-dsv/ds/color';

@Component({
    selector: 'dsv-avatar',
    imports: [],
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
    host: {
        '[class]': 'hostClasses()',
        '(click)': 'onClick()',
    },
})
export class DsvAvatarComponent extends DsvBaseColorComponent {
    readonly avatar = input<string>('');
    readonly callback = output<void>();

    readonly avatarLetter = signal<string>('');
    readonly isImage = signal<boolean>(false);
    readonly isCallback = signal<boolean>(false);

    constructor() {
        super();
        effect(() => {
            this.isImage.set(this.avatar().startsWith('http'));
            this.avatarLetter.set(this.avatar().substring(0, 1).toUpperCase() ?? '?');
            this.isCallback.set(isCallback(this.callback));
        });
    }

    hostClasses(): string {
        const classes: string[] = [this.color()];
        this.isCallback() && classes.push('callback');
        return this.getClasses('dsv-avatar', classes);
    }

    onClick(): void {
        this.isCallback() && this.callback?.emit();
    }
}
