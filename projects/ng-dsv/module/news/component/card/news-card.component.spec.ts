import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NewsCardComponent } from './news-card.component';

describe('NewsCardComponent', () => {
    let component: NewsCardComponent;
    let fixture: ComponentFixture<NewsCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NewsCardComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(NewsCardComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
