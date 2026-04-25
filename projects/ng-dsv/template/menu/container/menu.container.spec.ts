import { provideZonelessChangeDetection, TemplateRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MenuService } from '@ng-vagabond-lab/ng-dsv/ds/menu';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/modules/auth';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { describe, expect, it, vi } from 'vitest';
import { MenuContainer } from './menu.container';

const mockAuthService = { hasRole: vi.fn() };
const mockRouterService = { currentUrl: vi.fn().mockReturnValue('/home') };
const mockMenuService = { closeMenu: vi.fn() };

describe('MenuContainer', () => {
    const setup = () => {
        TestBed.configureTestingModule({
            imports: [MenuContainer],
            providers: [
                provideZonelessChangeDetection(),
                { provide: AuthService, useValue: mockAuthService },
                { provide: RouterService, useValue: mockRouterService },
                { provide: MenuService, useValue: mockMenuService },
            ],
        });
        return TestBed.createComponent(MenuContainer).componentInstance;
    };

    it('should create', () => {
        const component = setup();
        expect(component).toBeTruthy();
    });

    describe('getSlot', () => {
        it('When slots is empty, Then should return null', () => {
            const component = setup();
            expect(component.getSlot('list')).toBeNull();
        });

        it('When slot id matches, Then should return the template', () => {
            const component = setup();
            const mockTpl = {} as TemplateRef<any>;
            component.slots = { find: vi.fn().mockReturnValue({ tpl: mockTpl }) } as any;
            expect(component.getSlot('list')).toBe(mockTpl);
        });

        it('When slot id does not match, Then should return null', () => {
            const component = setup();
            component.slots = { find: vi.fn().mockReturnValue(undefined) } as any;
            expect(component.getSlot('unknown')).toBeNull();
        });
    });

    describe('isActive', () => {
        it('When currentUrl includes the url, Then should return true', () => {
            mockRouterService.currentUrl.mockReturnValue('/home/dashboard');
            const component = setup();
            expect(component.isActive('/home')).toBe(true);
        });

        it('When currentUrl does not include the url, Then should return false', () => {
            mockRouterService.currentUrl.mockReturnValue('/settings');
            const component = setup();
            expect(component.isActive('/home')).toBe(false);
        });
    });
});
