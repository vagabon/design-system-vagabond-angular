import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { NewsDto } from '../dto/news.dto';
import { NewsListService } from './list/news-list.service';
import { NewsService } from './news.service';

const mockNews: NewsDto = {
    id: 1,
    title: 'Test',
    resume: 'Resume',
    description: 'Description',
    image: 'img.jpg',
} as NewsDto;

const mockApiService = {
    get: vi.fn(),
    createOrUpdate: vi.fn(),
};

const mockBaseFetchService = {
    getDataFromState: vi.fn().mockReturnValue(null),
    setDataToState: vi.fn(),
};

const mockNewsListService = {
    fetchByPage: vi.fn(),
    search: vi.fn().mockReturnValue({}),
};

describe('NewsService', () => {
    let service: NewsService;

    beforeEach(() => {
        vi.clearAllMocks();

        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            providers: [
                NewsService,
                provideTranslateService(),
                { provide: NewsListService, useValue: mockNewsListService },
            ],
        });

        service = TestBed.inject(NewsService);
        Object.assign(service, mockBaseFetchService);
        Object.defineProperty(service, 'apiService', {
            value: mockApiService,
            configurable: true,
        });
    });

    describe('when doFetchNews is called and data exists in transfer state', () => {
        it('then initializes news from state without calling apiService', () => {
            mockBaseFetchService.getDataFromState.mockReturnValue(mockNews);
            service.doFetchNews(1);

            expect(service.news.get(1)).toEqual(mockNews);
            expect(mockApiService.get).not.toHaveBeenCalled();
        });
    });

    describe('when doFetchNews is called and data is not in transfer state', () => {
        it('then calls apiService.get and initializes news on callback', () => {
            mockApiService.get.mockImplementation((_url: string, cb: (d: NewsDto) => void) => cb(mockNews));
            service.doFetchNews(1);

            expect(mockApiService.get).toHaveBeenCalledWith('/news/1', expect.any(Function));
            expect(mockBaseFetchService.setDataToState).toHaveBeenCalledWith('/news/1', mockNews);
            expect(service.news.get(1)).toEqual(mockNews);
        });
    });

    describe('when createOrUpdate is called for a new news', () => {
        it('then toast contains "créer", updates store, calls fetchByPage and callback', () => {
            const newNews = { ...mockNews, id: 0 };
            const callback = vi.fn();
            mockApiService.createOrUpdate.mockImplementation(
                (_e: string, _n: NewsDto, cb: (d: NewsDto) => void) => cb(mockNews),
            );

            service.createOrUpdate(newNews, callback);

            expect(mockApiService.createOrUpdate).toHaveBeenCalledWith(
                'news',
                newNews,
                expect.any(Function),
                expect.stringContaining('créer'),
            );
            expect(service.news.get(mockNews.id)).toEqual(mockNews);
            expect(mockNewsListService.fetchByPage).toHaveBeenCalledWith(mockNewsListService.search(), 1);
            expect(callback).toHaveBeenCalledWith(mockNews);
        });
    });

    describe('when createOrUpdate is called for an existing news without callback', () => {
        it('then toast contains "mise a jour" and does not throw', () => {
            mockApiService.createOrUpdate.mockImplementation(
                (_e: string, _n: NewsDto, cb: (d: NewsDto) => void) => cb(mockNews),
            );

            service.createOrUpdate(mockNews);

            expect(mockApiService.createOrUpdate).toHaveBeenCalledWith(
                'news',
                mockNews,
                expect.any(Function),
                expect.stringContaining('mise a jour'),
            );
            expect(mockNewsListService.fetchByPage).toHaveBeenCalled();
        });
    });
});
