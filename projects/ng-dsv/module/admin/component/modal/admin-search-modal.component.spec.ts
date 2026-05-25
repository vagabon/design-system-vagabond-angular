import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { SeoService } from '@ng-vagabond-lab/ng-dsv/base/service/seo/seo.service';
import { ModalService } from '@ng-vagabond-lab/ng-dsv/ds/modal';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/module/auth';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { ManyToManyDto } from '../../dto/admin.dto';
import { AdminService } from '../../service/admin.service';
import { AdminSearchModalContainer } from './admin-search-modal.component';
import { provideTranslateService } from '@ngx-translate/core';

describe('AdminSearchModalContainer', () => {
    let fixture: ComponentFixture<AdminSearchModalContainer>;
    let component: AdminSearchModalContainer;

    const isModalOpenSignal = signal(false);
    const hasRoleSignal = vi.fn().mockReturnValue(true);

    let modalServiceMock: { getSignal: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> };
    let adminServiceMock: { get: ReturnType<typeof vi.fn> };
    let authServiceMock: { hasRole: ReturnType<typeof vi.fn> };
    let routerServiceMock: { router: { navigate: ReturnType<typeof vi.fn> } };
    let seoServiceMock: object;

    const m2mDto: ManyToManyDto = {
        endPoint: '/api/items',
        fields: 'id,name',
    } as ManyToManyDto;

    const mockData = {
        content: [{ id: 1, name: 'Item 1' } as ApiDto, { id: 2, name: 'Item 2' } as ApiDto] as ApiDto[],
    };

    beforeEach(async () => {
        modalServiceMock = {
            getSignal: vi.fn(() => isModalOpenSignal()),
            close: vi.fn(),
        };

        adminServiceMock = {
            get: vi.fn(),
        };

        authServiceMock = {
            hasRole: hasRoleSignal,
        };

        routerServiceMock = {
            router: { navigate: vi.fn() },
        };

        seoServiceMock = {};

        await TestBed.configureTestingModule({
            imports: [AdminSearchModalContainer],
            providers: [
                provideTranslateService(),
                { provide: ModalService, useValue: modalServiceMock },
                { provide: AdminService, useValue: adminServiceMock },
                { provide: AuthService, useValue: authServiceMock },
                { provide: RouterService, useValue: routerServiceMock },
                { provide: SeoService, useValue: seoServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AdminSearchModalContainer);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('m2em', m2mDto);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        isModalOpenSignal.set(false);
    });

    describe('initialisation', () => {
        it('should create the component', () => {
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should set requiredRole to ADMIN', () => {
            fixture.detectChanges();
            expect(component['requiredRole']()).toBe('ADMIN');
        });

        it('should initialize search and datas signals', () => {
            fixture.detectChanges();
            expect(component.search()).toBe('');
            expect(component.datas()).toEqual([]);
        });
    });

    describe('effect - modal open', () => {
        it('should call adminService.get when modal is open', () => {
            isModalOpenSignal.set(true);
            fixture.detectChanges();

            expect(adminServiceMock.get).toHaveBeenCalledWith(
                m2mDto.endPoint,
                m2mDto.fields,
                '',
                0,
                500,
                expect.any(Function),
            );
        });

        it('should not call adminService.get when modal is closed', () => {
            isModalOpenSignal.set(false);
            fixture.detectChanges();

            expect(adminServiceMock.get).not.toHaveBeenCalled();
        });

        it('should update datas signal with response content', () => {
            isModalOpenSignal.set(true);
            adminServiceMock.get.mockImplementation((...args: unknown[]) => {
                const cb = args[5] as (data: { content: ApiDto[] }) => void;
                cb(mockData);
            });

            fixture.detectChanges();

            expect(component.datas()).toEqual(mockData.content);
        });
    });

    describe('getValue', () => {
        it('should return the value of the given field', () => {
            const data = { id: 42, name: 'Test' } as ApiDto;
            expect(component.getValue(data, 'name')).toBe('Test');
        });
    });

    describe('doSearch', () => {
        it('should update search signal', () => {
            component.doSearch('angular');
            expect(component.search()).toBe('angular');
        });
    });

    describe('clickItem', () => {
        it('should emit callback and close modal', () => {
            const emitSpy = vi.spyOn(component.callback, 'emit');
            const data = { id: 1, name: 'Item' } as ApiDto;

            component.clickItem(data);

            expect(emitSpy).toHaveBeenCalledWith(data);
            expect(modalServiceMock.close).toHaveBeenCalledWith('m2m');
        });
    });

    describe('hasAccess', () => {
        it('should redirect if user does not have ADMIN role', () => {
            authServiceMock.hasRole.mockReturnValue(false);
            fixture.detectChanges();

            expect(routerServiceMock.router.navigate).toHaveBeenCalledWith(['/']);
        });

        it('should not redirect if user has ADMIN role', () => {
            authServiceMock.hasRole.mockReturnValue(true);
            fixture.detectChanges();

            expect(routerServiceMock.router.navigate).not.toHaveBeenCalled();
        });
    });
});
