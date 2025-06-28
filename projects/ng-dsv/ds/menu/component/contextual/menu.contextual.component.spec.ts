import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CLICK_LEFT, CLICK_RIGHT, MenuContextualClickType, MenuContextualDto } from '../../dto/menu.contextual';
import { DsvMenuContextualComponent } from './menu.contextual.component';

describe('DsvMenuContextualComponent', () => {
    let component: DsvMenuContextualComponent;
    let fixture: ComponentFixture<DsvMenuContextualComponent>;

    const mockOptions: MenuContextualDto[] = [
        { id: 'home', icon: 'home-icon', text: 'Option 1' },
        { id: 'settings', icon: 'settings-icon', text: 'Option 2' },
        { id: 'logout', icon: 'logout-icon', text: 'Option 3', divider: true }
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvMenuContextualComponent],
            providers: [provideZonelessChangeDetection()],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvMenuContextualComponent);
        component = fixture.componentInstance;
        component.options = signal(mockOptions) as unknown as InputSignal<MenuContextualDto[]>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle menu visibility on left click', () => {
        component.buttonClick = signal(CLICK_LEFT) as unknown as InputSignal<MenuContextualClickType>;
        const event = new MouseEvent('click', { button: 0 });
        spyOn(component, 'toogleMenu');

        const childElement = fixture.debugElement.query(By.css('.context-menu')).nativeElement;
        Object.defineProperty(event, 'target', { value: childElement });

        component.onClick(event);
        expect(component.toogleMenu).toHaveBeenCalled();
    });

    it('should toggle menu visibility on right click', () => {
        component.buttonClick = signal(CLICK_RIGHT) as unknown as InputSignal<MenuContextualClickType>;
        const event = new MouseEvent('contextmenu', { button: 2 });
        spyOn(component, 'toogleMenu');

        const childElement = fixture.debugElement.query(By.css('.context-menu')).nativeElement;
        Object.defineProperty(event, 'target', { value: childElement });

        component.onContextMenu(event);
        expect(component.toogleMenu).toHaveBeenCalled();
    });

    it('should close menu when clicking outside', () => {
        spyOn(component, 'closeMenu');
        const event = new MouseEvent('click', { bubbles: true });
        Object.defineProperty(event, 'target', { value: document });
        component.onClick(event);
        expect(component.closeMenu).toHaveBeenCalled();
    });

    it('should emit callback on option click', () => {
        spyOn(component.callback, 'emit');
        const option = mockOptions[0];
        const event = new MouseEvent('click');
        component.onOptionClick(event, option.id);
        expect(component.callback.emit).toHaveBeenCalledWith(option.id);
    });

    it('should display options correctly', () => {
        component.visible.set(true);
        fixture.detectChanges();
        const options = fixture.debugElement.queryAll(By.css('li'));
        expect(options.length).toBe(mockOptions.length);
    });
});
