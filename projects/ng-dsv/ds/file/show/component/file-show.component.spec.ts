import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvFileShowComponent } from './file-show.component';

describe('FileShowComponent', () => {
    let component: DsvFileShowComponent;
    let fixture: ComponentFixture<DsvFileShowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvFileShowComponent],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvFileShowComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('src', '');
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should have default alt text', () => {
        expect(component.alt()).toBe('Exemple du dsv file show');
    });
});
