import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ApiDto, PageableDto } from '@ng-vagabond-lab/ng-dsv/api';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AdminTabConfDto } from '../../dto/admin.dto';
import { ADMIN_USER } from '../../public-api';
import { AdminService } from '../../service/admin.service';
import { AdminSearchContainer } from './admin.search.container';

describe('AdminSearchContainer', () => {
    let component: AdminSearchContainer;
    let fixture: ComponentFixture<AdminSearchContainer>;
    let mockAdminService: jasmine.SpyObj<AdminService>;

    const mockTabs: AdminTabConfDto = {
        max: 10,
        tabs: ADMIN_USER
    };

    beforeEach(async () => {
        mockAdminService = jasmine.createSpyObj('AdminService', ['get', 'findById', 'datas'], {
            tabs: () => mockTabs
        });
        const pageable: PageableDto<ApiDto[]> = {
            totalPages: 2,
            totalElements: 5,
            content: [{ id: 123 }]
        }
        mockAdminService.datas.and.returnValue(pageable);

        await TestBed.configureTestingModule({
            imports: [AdminSearchContainer],
            providers: [
                provideZonelessChangeDetection(),
                provideTranslateService(),
                { provide: AdminService, useValue: mockAdminService },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ type: 'user', id: '42' })
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AdminSearchContainer);
        component = fixture.componentInstance;

        (component as any).routeParams = () => ({ type: 'user' });

        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize tab and tabConfig from routeParams', () => {
        expect(component.tab()).toBe('user');
        expect(component.tabConfig()?.name).toBe('user');
    });

    it('should call adminService.get on gotoPage', () => {
        component.gotoPage(0);
        expect(mockAdminService.get).toHaveBeenCalled();
    });

    it('should generate tab list based on service config', () => {
        const tabs = component.tabs();
        expect(tabs.length).toBe(1);
        expect(tabs[0].title).toBe('user');
    });
});
