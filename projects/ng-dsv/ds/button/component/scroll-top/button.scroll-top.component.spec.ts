import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvButtonComponent } from '../button.component';
import { ButtonScrollTopComponent } from './button.scroll-top.component';

describe('ButtonScrollTopComponent', () => {
    let component: ButtonScrollTopComponent;
    let fixture: ComponentFixture<ButtonScrollTopComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonScrollTopComponent, DsvButtonComponent],
            providers: [
                provideZonelessChangeDetection(),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonScrollTopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set show to true when scroll > 400', () => {
        component.scroll = signal(800) as unknown as InputSignal<number>;
        fixture.detectChanges();
        setTimeout(() => expect(component.show()).toBeTrue(), 500);
    });

    it('should set show to false when scroll <= 400', () => {
        component.scroll = signal(200) as unknown as InputSignal<number>;
        expect(component.show()).toBeFalse();
    });

    it('should scroll to top when scrollToTop is called', () => {
        const scrollElement = document.createElement('div');
        scrollElement.id = 'scroll';
        scrollElement.scrollTo = jasmine.createSpy('scrollTo');

        document.body.appendChild(scrollElement);

        component.scrollToTop();

        expect(scrollElement.scrollTo).toHaveBeenCalledWith(0, 0);

        document.body.removeChild(scrollElement); // clean DOM
    });
});
