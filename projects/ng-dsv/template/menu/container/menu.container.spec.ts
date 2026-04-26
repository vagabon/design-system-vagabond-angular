import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MenuService } from '@ng-vagabond-lab/ng-dsv/ds/menu';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/modules/auth';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MenuSlotDirective } from '../slot/menu.slot';
import { MenuContainer } from './menu.container';

const mockAuthService = { user: signal(null) };
const mockRouterService = { currentUrl: signal('') };
const mockMenuService = {};

describe('MenuContainer', () => {
    let component: MenuContainer;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MenuContainer],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: RouterService, useValue: mockRouterService },
                { provide: MenuService, useValue: mockMenuService },
            ],
        }).compileComponents();

        const fixture = TestBed.createComponent(MenuContainer);
        component = fixture.componentInstance;
    });

    describe('getSlot', () => {
        it('returns the template when slot id matches', () => {
            const mockTpl = {} as any;
            const slot = { menuSlot: 'header', tpl: mockTpl } as MenuSlotDirective;
            vi.spyOn(component as any, 'slots', 'get').mockReturnValue(signal([slot]));

            expect(component.getSlot('header')).toBe(mockTpl);
            expect(component.getSlot('footer')).toBeNull();
            expect(component.getSlot('')).toBeNull();
        });

        it('returns null when slots is empty', () => {
            vi.spyOn(component as any, 'slots', 'get').mockReturnValue(signal([]));

            expect(component.getSlot('header')).toBeNull();
        });
    });

    describe('isActive', () => {
        it('returns true when url matches and false otherwise', () => {
            mockRouterService.currentUrl = signal('/dashboard/home');

            expect(component.isActive('/dashboard')).toBe(true);
            expect(component.isActive('/settings')).toBe(false);
            expect(component.isActive('')).toBe(true);
        });
    });
});
