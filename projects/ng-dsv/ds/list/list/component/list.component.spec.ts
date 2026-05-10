import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvListComponent } from './list.component';

describe('ListComponent', () => {
    let fixture: ComponentFixture<DsvListComponent>;
    let component: DsvListComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvListComponent],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvListComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
