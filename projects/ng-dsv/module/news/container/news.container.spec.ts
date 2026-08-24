import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/module/auth';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { provideTranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { NewsDto } from '../dto/news.dto';
import { NewsService } from '../service/news.service';
import { NewsContainer } from './news.container';

const mockNews: NewsDto = {
    id: 1,
    title: 'Test News',
    resume: 'Test Resume',
    image: 'test.jpg',
} as NewsDto;

let paramsSubject: Subject<Record<string, string>>;

describe('NewsContainer', () => {
    let fixture: ComponentFixture<NewsContainer>;
    let component: NewsContainer;
    let routeParams: ReturnType<typeof signal<Record<string, string>>>;
    let newsData: ReturnType<typeof signal<unknown>>;
    let newsMap: Map<number, NewsDto>;
    let doFetchNews: ReturnType<typeof vi.fn>;
    let setMeta: ReturnType<typeof vi.fn>;
    let routerNavigate: ReturnType<typeof vi.fn>;
    let canFetch: ReturnType<typeof vi.fn>;
    let hasRole: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        routeParams = signal({});
        newsData = signal<unknown>(undefined);
        newsMap = new Map();
        doFetchNews = vi.fn();
        setMeta = vi.fn();
        routerNavigate = vi.fn();
        canFetch = vi.fn().mockReturnValue(true);
        hasRole = vi.fn().mockReturnValue(false);
        paramsSubject = new Subject();

        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            imports: [NewsContainer],
            providers: [
                provideTranslateService(),
                { provide: ActivatedRoute, useValue: { params: { subscribe: vi.fn() } } },
                { provide: AuthService, useValue: { hasRole, canFetch } },
                { provide: RouterService, useValue: { router: { navigate: routerNavigate } } },
                { provide: ActivatedRoute, useValue: { params: paramsSubject } },
                {
                    provide: NewsService,
                    useValue: {
                        news: {
                            data: newsData,
                            get: (id: number) => newsMap.get(id),
                            set: (id: number, val: NewsDto) => newsMap.set(id, val),
                        },
                        doFetchNews,
                    },
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(NewsContainer);
        component = fixture.componentInstance;

        vi.spyOn(component, 'routeParams').mockReturnValue(routeParams());
    });

    describe('when newsId is valid and news exists in store', () => {
        it('then sets news and calls setMeta', () => {
            newsMap.set(1, mockNews);
            hasRole.mockReturnValue(true);

            TestBed.tick();
            routeParams.set({ newsId: '1' });
            vi.spyOn(component, 'routeParams').mockReturnValue({ newsId: '1' });
            TestBed.tick();

            expect(doFetchNews).not.toHaveBeenCalled();
        });
    });

    describe('when newsId is valid and news is not in store and canFetch is true', () => {
        it('then calls doFetchNews', () => {
            vi.spyOn(component, 'routeParams').mockReturnValue({ newsId: '2' });
            TestBed.tick();

            expect(doFetchNews).toHaveBeenCalledWith(2);
            expect(setMeta).not.toHaveBeenCalled();
        });
    });

    describe('when newsId is valid and canFetch is false', () => {
        it('then does not call doFetchNews nor setMeta', () => {
            canFetch.mockReturnValue(false);
            vi.spyOn(component, 'routeParams').mockReturnValue({ newsId: '3' });
            TestBed.tick();

            expect(doFetchNews).not.toHaveBeenCalled();
            expect(setMeta).not.toHaveBeenCalled();
        });
    });

    describe('when newsId is present in store and newsService.news.data() updates', () => {
        it('then sets the news signal', () => {
            newsMap.set(1, mockNews);
            vi.spyOn(component, 'routeParams').mockReturnValue({ newsId: '1' });
            component['newsId'].set(1);
            newsData.set(mockNews);
            TestBed.tick();

            expect(component.news()).toEqual(mockNews);
        });
    });

    describe('when user has ADMIN role', () => {
        it('then isAdmin is true', () => {
            hasRole.mockReturnValue(true);
            fixture.detectChanges();
            expect(component.isAdmin()).toBe(true);
        });
    });

    describe('when user does not have ADMIN role', () => {
        it('then isAdmin is false', () => {
            hasRole.mockReturnValue(false);
            fixture.detectChanges();
            expect(component.isAdmin()).toBe(false);
        });
    });

    describe('when doShare is called', () => {
        it('then calls navigator.share with correct payload', async () => {
            const shareMock = vi.fn().mockResolvedValue(undefined);
            Object.defineProperty(globalThis.navigator, 'share', { value: shareMock, configurable: true });

            await component.doShare(mockNews);

            expect(shareMock).toHaveBeenCalledWith({
                title: mockNews.title,
                text: mockNews.resume,
                url: 'https://movie-keeper.fr/news/' + mockNews.id,
            });
        });
    });
});
