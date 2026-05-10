import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardImgComponent } from './card.img.component';

describe('CardImgComponent', () => {
    let component: CardImgComponent;
    let fixture: ComponentFixture<CardImgComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CardImgComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CardImgComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
