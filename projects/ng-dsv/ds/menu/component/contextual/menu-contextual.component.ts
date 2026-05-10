import { Component, ElementRef, inject, input, output, signal } from '@angular/core';
import {
    CLICK_BOTH,
    CLICK_LEFT,
    CLICK_RIGHT,
    MenuContextualClickType,
    MenuContextualDto,
} from '../../dto/menu.contextual';

@Component({
    selector: 'dsv-menu-contextual',
    templateUrl: './menu-contextual.component.html',
    styleUrls: ['./menu-contextual.component.scss'],
    host: {
        '(document:click)': 'onClick($event)',
        '(document:contextmenu)': 'onContextMenu($event)',
    },
})
export class DsvMenuContextualComponent {
    readonly elementRef = inject(ElementRef);

    readonly buttonClick = input<MenuContextualClickType>(CLICK_BOTH);
    readonly options = input<MenuContextualDto[]>([]);

    readonly callback = output<string>();
    readonly callbackClose = output<void>();

    readonly visible = signal<boolean>(false);
    readonly selectedOption = signal<string>('');

    onOptionClick(event: MouseEvent, option: string): void {
        event.stopPropagation();
        this.callback.emit(option);
        this.closeMenu();
    }

    onClick(event: MouseEvent): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.closeMenu();
        } else if (this.buttonClick() === CLICK_LEFT || this.buttonClick() === CLICK_BOTH) {
            this.toogleMenu();
        }
    }

    onContextMenu(event: MouseEvent): void {
        event.preventDefault();
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.closeMenu();
        } else if (this.buttonClick() === CLICK_RIGHT || this.buttonClick() === CLICK_BOTH) {
            this.toogleMenu();
        }
    }

    closeMenu(): void {
        this.visible.set(false);
        this.callbackClose.emit();
    }

    toogleMenu(): void {
        this.visible.set(!this.visible());
    }
}
