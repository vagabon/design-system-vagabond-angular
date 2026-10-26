import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AdminTabConfDto } from '../../dto/admin.dto';
import { ADMIN_USER } from '../../public-api';
import { AdminService } from '../../service/admin.service';
import { AdminSearchContainer } from './admin-search.container';

describe('AdminSearchContainer', () => {
    let component: AdminSearchContainer;
    let fixture: ComponentFixture<AdminSearchContainer>;
    let mockAdminService: Partial<AdminService>;

    const mockTabs: AdminTabConfDto = {
        max: 10,
        tabs: ADMIN_USER,
    };

    beforeEach(async () => {
        mockAdminService = {
            get: vi.fn(),
            findById: vi.fn(),
            datas: signal({}),
            tabs: signal(mockTabs),
            page: signal({}),
            search: signal({}),
        };

        await TestBed.configureTestingModule({
            imports: [AdminSearchContainer],
            providers: [
                provideTranslateService(),
                { provide: AdminService, useValue: mockAdminService },
                {
                    provide: ActivatedRoute,
                    useValue: { params: of({ type: 'users', id: '42' }) },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AdminSearchContainer);
        component = fixture.componentInstance;

        (component as any).routeParams = () => ({ type: 'users' });

        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize tab and tabConfig from routeParams', () => {
        expect(component.tab()).toBe('users');
        expect(component.tabConfig()?.name).toBe('users');
    });

    it('should call adminService.get on gotoPage', () => {
        component.gotoPage(0);
        expect(mockAdminService.get).toHaveBeenCalled();
    });

    it('should generate tab list based on service config', () => {
        const tabs = component.tabs();
        expect(tabs.length).toBe(1);
        expect(tabs[0].title).toBe('users');
    });
});
