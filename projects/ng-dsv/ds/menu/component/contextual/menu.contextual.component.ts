import { Component, ElementRef, HostListener, inject, input, output, signal } from "@angular/core";
import { CLICK_LEFT, CLICK_RIGHT, MenuContextualClickType, MenuContextualDto } from "../../dto/menu.contextual";

@Component({
    selector: 'dsv-menu-contextual',
    templateUrl: './menu.contextual.component.html',
    styleUrls: ['./menu.contextual.component.scss']
})
export class DsvMenuContextualComponent {
    readonly elementRef = inject(ElementRef);

    buttonClick = input<MenuContextualClickType>(CLICK_LEFT);
    options = input<MenuContextualDto[]>([]);

    callback = output<string>();
    callbackClose = output<void>();

    visible = signal<boolean>(false);
    selectedOption = signal<string>('');

    onOptionClick(event: MouseEvent, option: string) {
        event.stopPropagation();
        this.callback.emit(option);
        this.closeMenu();
    }

    @HostListener('document:click', ['$event'])
    onClick(event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.closeMenu();
        } else if (this.buttonClick() === CLICK_LEFT) {
            console.log('fuck')
            this.toogleMenu();
        }
    }

    @HostListener('document:contextmenu', ['$event'])
    onContextMenu(event: MouseEvent) {
        event.preventDefault();
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.closeMenu();
        } else if (this.buttonClick() === CLICK_RIGHT) {
            this.toogleMenu();
        }
    }

    closeMenu() {
        this.visible.set(false);
        this.callbackClose.emit();
    }

    toogleMenu() {
        this.visible.set(!this.visible());
    }
}