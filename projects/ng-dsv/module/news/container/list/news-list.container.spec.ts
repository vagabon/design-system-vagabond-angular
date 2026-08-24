import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { NewsListContainer } from './news-list.container';

describe('NewsListContainer', () => {
    let component: NewsListContainer;
    let fixture: ComponentFixture<NewsListContainer>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NewsListContainer],
            providers: [provideTranslateService()],
        }).compileComponents();

        fixture = TestBed.createComponent(NewsListContainer);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
