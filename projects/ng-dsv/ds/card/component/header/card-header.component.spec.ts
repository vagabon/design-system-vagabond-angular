import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsvCardHeaderComponent } from './card-header.component';

describe('CardHeaderComponent', () => {
    let component: DsvCardHeaderComponent;
    let fixture: ComponentFixture<DsvCardHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvCardHeaderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvCardHeaderComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
