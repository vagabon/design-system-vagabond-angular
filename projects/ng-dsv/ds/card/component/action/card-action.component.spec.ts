import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsvCardActionComponent } from './card-action.component';

describe('CardActionComponent', () => {
    let component: DsvCardActionComponent;
    let fixture: ComponentFixture<DsvCardActionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvCardActionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvCardActionComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
