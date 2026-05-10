import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsvCardImgComponent } from './card-img.component';

describe('CardImgComponent', () => {
    let component: DsvCardImgComponent;
    let fixture: ComponentFixture<DsvCardImgComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvCardImgComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvCardImgComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
