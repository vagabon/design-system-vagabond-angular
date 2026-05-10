import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { ButtonScrollTopComponent } from './scroll-top-button.component';

describe('ButtonScrollTopComponent', () => {
    let component: ButtonScrollTopComponent;
    let fixture: ComponentFixture<ButtonScrollTopComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonScrollTopComponent, DsvButtonComponent],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonScrollTopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set show to true when scroll > 400', () => {
        fixture = TestBed.createComponent(ButtonScrollTopComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('scroll', 800);
        fixture.detectChanges();

        expect(component.show()).toBe(true);
    });

    it('should set show to false when scroll <= 400', () => {
        fixture.componentRef.setInput('scroll', 200);
        expect(component.show()).toBe(false);
    });
});
