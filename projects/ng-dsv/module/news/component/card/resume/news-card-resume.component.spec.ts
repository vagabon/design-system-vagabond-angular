import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NewsCardResumeComponent } from './news-card-resume.component';

describe('NewsCardResumeComponent', () => {
    let component: NewsCardResumeComponent;
    let fixture: ComponentFixture<NewsCardResumeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NewsCardResumeComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(NewsCardResumeComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
