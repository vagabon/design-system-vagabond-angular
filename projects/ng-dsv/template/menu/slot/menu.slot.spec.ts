import {
    Component,
    provideZonelessChangeDetection,
    QueryList,
    TemplateRef,
    ViewChildren,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { MenuSlotDirective } from './menu.slot';

@Component({
    template: `<ng-template menuSlot="list"><span>content</span></ng-template>`,
    imports: [MenuSlotDirective],
})
class TestHostComponent {
    @ViewChildren(MenuSlotDirective) slots!: QueryList<MenuSlotDirective>;
}

const setup = () => {
    TestBed.configureTestingModule({
        imports: [TestHostComponent],
        providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    return fixture.componentInstance.slots.first;
};

describe('MenuSlotDirective', () => {
    it('should create', () => {
        expect(setup()).toBeTruthy();
    });

    it('When menuSlot input is set, Then should expose the correct slot id', () => {
        const directive = setup();
        expect(directive.menuSlot).toBe('list');
    });

    it('When directive is created, Then should expose a TemplateRef', () => {
        const directive = setup();
        expect(directive.tpl).toBeInstanceOf(TemplateRef);
    });
});
