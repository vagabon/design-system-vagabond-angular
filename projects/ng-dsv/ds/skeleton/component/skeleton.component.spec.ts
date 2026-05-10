import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsvSekeletonComponent } from './skeleton.component';

describe('DsvSekeletonComponent', () => {
    let component: DsvSekeletonComponent;
    let fixture: ComponentFixture<DsvSekeletonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvSekeletonComponent],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvSekeletonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
