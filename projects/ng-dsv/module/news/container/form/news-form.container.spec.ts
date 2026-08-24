import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { NewsFormContainer } from './news-form.container';

describe('NewsFormContainer', () => {
    let component: NewsFormContainer;
    let fixture: ComponentFixture<NewsFormContainer>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NewsFormContainer],
            providers: [
                provideTranslateService(),
                {
                    provide: ActivatedRoute,
                    useValue: { params: of({}), snapshot: { params: {} } },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(NewsFormContainer);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create', () => {
        component
            .newsForm()
            .value.update((data) => ({
                ...data,
                title: 'title',
                resume: 'resume',
                description: 'description',
            }));

        component.doSubmit();
        expect(component).toBeTruthy();
    });
});
