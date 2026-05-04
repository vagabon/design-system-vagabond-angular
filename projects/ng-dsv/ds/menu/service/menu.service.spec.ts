import { TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';

describe('MenuService', () => {
    let service: MenuService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MenuService);
    });

    it('when service is created, then isMenuOpen should be false', () => {
        expect(service.isMenuOpen()).toBe(false);
    });

    it('when toogleMenu is called, then isMenuOpen should be true', () => {
        service.toogleMenu();
        expect(service.isMenuOpen()).toBe(true);
    });

    it('when toogleMenu is called twice, then isMenuOpen should be false', () => {
        service.toogleMenu();
        service.toogleMenu();
        expect(service.isMenuOpen()).toBe(false);
    });

    it('when closeMenu is called, then isMenuOpen should be false', () => {
        service.toogleMenu();
        service.closeMenu();
        expect(service.isMenuOpen()).toBe(false);
    });
});
