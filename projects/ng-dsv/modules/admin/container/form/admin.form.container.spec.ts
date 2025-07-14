import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DsvCardComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AdminFormComponent } from '../../component/form/admin.form.component';
import { ADMIN_USER } from '../../public-api';
import { AdminService } from '../../service/admin.service';
import { AdminFormContainer } from './admin.form.container';

describe('AdminFormContainer', () => {
    let component: AdminFormContainer;
    let fixture: ComponentFixture<AdminFormContainer>;
    let adminServiceMock: jasmine.SpyObj<AdminService>;

    beforeEach(async () => {
        adminServiceMock = jasmine.createSpyObj('AdminService', ['tabs', 'findById', 'get', 'put', 'data']);
        adminServiceMock.tabs.and.returnValue({
            max: 10,
            tabs: ADMIN_USER
        });
        adminServiceMock.data.and.returnValue({ id: 123 });

        adminServiceMock.get.and.returnValue();

        await TestBed.configureTestingModule({
            imports: [AdminFormContainer, DsvCardComponent, AdminFormComponent],
            providers: [
                provideZonelessChangeDetection(),
                provideTranslateService(),
                { provide: AdminService, useValue: adminServiceMock },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ type: 'user', id: '42' })
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AdminFormContainer);
        component = fixture.componentInstance;
        fixture.detectChanges(); // déclenche l'initialisation (effect, etc.)
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should set tab and tabConfig based on route', () => {
        expect(component.tab()).toBe('user');
        expect(component.tabConfig()?.name).toBe('user');
    });

    it('should call findById with correct tab and id', () => {
        expect(adminServiceMock.findById).toHaveBeenCalledWith('user', '42');
    });

    it('should call sendForm and merge data correctly', () => {
        const dto = { name: 'Test' };
        component.sendForm(dto as any);
        expect(adminServiceMock.put).toHaveBeenCalled();
    });
});
