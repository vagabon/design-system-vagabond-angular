import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { MenuService } from '../public-api';
import { DsvMenuComponent } from './menu.component';

describe('DsvMenuComponent', () => {
    let fixture: ComponentFixture<DsvMenuComponent>;
    let component: DsvMenuComponent;
    let platformServiceMock: { isPlatformBrowser: ReturnType<typeof vi.fn> };
    let menuServiceMock: { isMenuOpen: ReturnType<typeof vi.fn>; toogleMenu: ReturnType<typeof vi.fn> };

    const isMenuOpenSignal = signal(false);

    beforeEach(async () => {
        platformServiceMock = {
            isPlatformBrowser: vi.fn().mockReturnValue(true),
        };

        menuServiceMock = {
            isMenuOpen: vi.fn(() => isMenuOpenSignal()),
            toogleMenu: vi.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [DsvMenuComponent],
            providers: [
                { provide: PlatformService, useValue: platformServiceMock },
                { provide: MenuService, useValue: menuServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvMenuComponent);
        component = fixture.componentInstance;
    });

    describe('onClickOutside', () => {
        it('should toggle menu when click is outside the element', () => {
            isMenuOpenSignal.set(true);
            platformServiceMock.isPlatformBrowser.mockReturnValue(true);

            const outsideElement = document.createElement('div');
            document.body.appendChild(outsideElement);

            component.onClickOutside({ target: outsideElement } as unknown as Event);

            expect(menuServiceMock.toogleMenu).toHaveBeenCalled();

            document.body.removeChild(outsideElement);
        });

        it('should not toggle menu when click is inside the element', () => {
            isMenuOpenSignal.set(true);
            platformServiceMock.isPlatformBrowser.mockReturnValue(true);

            const insideElement = fixture.nativeElement;

            component.onClickOutside({ target: insideElement } as unknown as Event);

            expect(menuServiceMock.toogleMenu).not.toHaveBeenCalled();
        });

        it('should not toggle menu when platform is not browser', () => {
            isMenuOpenSignal.set(true);
            platformServiceMock.isPlatformBrowser.mockReturnValue(false);

            const outsideElement = document.createElement('div');
            document.body.appendChild(outsideElement);

            component.onClickOutside({ target: outsideElement } as unknown as Event);

            expect(menuServiceMock.toogleMenu).not.toHaveBeenCalled();

            document.body.removeChild(outsideElement);
        });

        it('should not toggle menu when menu is closed', () => {
            isMenuOpenSignal.set(false);
            platformServiceMock.isPlatformBrowser.mockReturnValue(true);

            const outsideElement = document.createElement('div');
            document.body.appendChild(outsideElement);

            component.onClickOutside({ target: outsideElement } as unknown as Event);

            expect(menuServiceMock.toogleMenu).not.toHaveBeenCalled();

            document.body.removeChild(outsideElement);
        });
    });

    describe('effect - menu classes', () => {
        let menu: HTMLElement;
        let collapse: HTMLElement;

        beforeEach(() => {
            menu = document.createElement('dsv-menu');
            collapse = document.createElement('div');
            collapse.id = 'collapse';
            document.body.appendChild(menu);
            document.body.appendChild(collapse);
        });

        afterEach(() => {
            document.body.removeChild(menu);
            document.body.removeChild(collapse);
        });

        it('should add open and show classes when menu is open', async () => {
            isMenuOpenSignal.set(true);
            fixture.detectChanges();

            expect(menu.classList.contains('open')).toBe(true);
            expect(collapse.classList.contains('show')).toBe(true);
        });

        it('should remove open and show classes when menu is closed', async () => {
            menu.classList.add('open');
            collapse.classList.add('show');

            isMenuOpenSignal.set(false);
            fixture.detectChanges();

            expect(menu.classList.contains('open')).toBe(false);
            expect(collapse.classList.contains('show')).toBe(false);
        });

        it('should not manipulate DOM when platform is not browser', () => {
            platformServiceMock.isPlatformBrowser.mockReturnValue(false);
            isMenuOpenSignal.set(true);
            fixture.detectChanges();

            expect(menu.classList.contains('open')).toBe(false);
        });
    });

    describe('showFooter input', () => {
        it('should have showFooter true by default', () => {
            expect(component.showFooter()).toBe(true);
        });
    });
});
