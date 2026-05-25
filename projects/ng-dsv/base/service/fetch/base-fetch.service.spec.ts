import { Directive, TransferState, makeStateKey } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ApiDto, ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { provideTranslateService } from '@ngx-translate/core';
import { BaseFetchService } from './base-fetch.service';

@Directive()
class TestFetchService extends BaseFetchService<ApiDto> {}

describe('BaseFetchService', () => {
    let service: TestFetchService;
    let transferStateMock: {
        hasKey: ReturnType<typeof vi.fn>;
        get: ReturnType<typeof vi.fn>;
        remove: ReturnType<typeof vi.fn>;
        set: ReturnType<typeof vi.fn>;
    };
    let platformServiceMock: { isPlatformBrowser: ReturnType<typeof vi.fn> };
    let apiServiceMock: { info: ReturnType<typeof vi.fn> };

    const TEST_URL = 'https://api.test.com/data';
    const TEST_DATA: ApiDto = { id: 1 } as ApiDto;

    beforeEach(async () => {
        transferStateMock = {
            hasKey: vi.fn().mockReturnValue(false),
            get: vi.fn().mockReturnValue(null),
            remove: vi.fn(),
            set: vi.fn(),
        };

        platformServiceMock = {
            isPlatformBrowser: vi.fn().mockReturnValue(true),
        };

        apiServiceMock = {
            info: vi.fn(),
        };

        await TestBed.configureTestingModule({
            providers: [
                provideTranslateService(),
                TestFetchService,
                { provide: TransferState, useValue: transferStateMock },
                { provide: PlatformService, useValue: platformServiceMock },
                { provide: ApiService, useValue: apiServiceMock },
                { provide: ToastService, useValue: { show: vi.fn() } },
            ],
        }).compileComponents();

        service = TestBed.inject(TestFetchService);
    });

    describe('ssr signal', () => {
        it('should be true by default', () => {
            expect(service.ssr()).toBe(true);
        });
    });

    describe('getStateKey', () => {
        it('should return a StateKey for the given url', () => {
            const key = service.getStateKey(TEST_URL);
            expect(key).toEqual(makeStateKey(TEST_URL));
        });
    });

    describe('getDataFromState', () => {
        it('should return null if key does not exist in transfer state', () => {
            transferStateMock.hasKey.mockReturnValue(false);

            const result = service.getDataFromState(TEST_URL);

            expect(result).toBeNull();
            expect(transferStateMock.get).not.toHaveBeenCalled();
            expect(transferStateMock.remove).not.toHaveBeenCalled();
        });

        it('should return data and remove key if key exists in transfer state', () => {
            transferStateMock.hasKey.mockReturnValue(true);
            transferStateMock.get.mockReturnValue(TEST_DATA);

            const result = service.getDataFromState(TEST_URL);

            expect(result).toEqual(TEST_DATA);
            expect(transferStateMock.remove).toHaveBeenCalledWith(makeStateKey(TEST_URL));
            expect(apiServiceMock.info).toHaveBeenCalledWith('load state', TEST_DATA);
        });
    });

    describe('setDataToState', () => {
        it('should not set data if platform is browser', () => {
            platformServiceMock.isPlatformBrowser.mockReturnValue(true);

            service.setDataToState(TEST_URL, TEST_DATA);

            expect(transferStateMock.set).not.toHaveBeenCalled();
        });

        it('should set data to state if platform is server', () => {
            platformServiceMock.isPlatformBrowser.mockReturnValue(false);

            service.setDataToState(TEST_URL, TEST_DATA);

            expect(transferStateMock.set).toHaveBeenCalledWith(makeStateKey(TEST_URL), TEST_DATA);
        });

        it('should set null to state if data is null and platform is server', () => {
            platformServiceMock.isPlatformBrowser.mockReturnValue(false);

            service.setDataToState(TEST_URL, null);

            expect(transferStateMock.set).toHaveBeenCalledWith(makeStateKey(TEST_URL), null);
        });
    });
});
