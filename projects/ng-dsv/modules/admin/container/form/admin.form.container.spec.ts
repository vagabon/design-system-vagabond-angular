// admin.form.container.spec.ts
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DsvCardComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminFormComponent } from '../../component/form/admin.form.component';
import { ADMIN_USER } from '../../public-api';
import { AdminService } from '../../service/admin.service';
import { AdminFormContainer } from './admin.form.container';

describe('AdminFormContainer', () => {
    let component: AdminFormContainer;
    let fixture: ComponentFixture<AdminFormContainer>;
    let adminServiceMock: {
        tabs: ReturnType<typeof vi.fn>;
        findById: ReturnType<typeof vi.fn>;
        get: ReturnType<typeof vi.fn>;
        put: ReturnType<typeof vi.fn>;
        data: ReturnType<typeof vi.fn>;
    };

    beforeEach(async () => {
        adminServiceMock = {
            tabs: vi.fn().mockReturnValue({ max: 10, tabs: ADMIN_USER }),
            findById: vi.fn(),
            get: vi.fn(),
            put: vi.fn(),
            data: vi.fn().mockReturnValue({ id: 123 }),
        };

        await TestBed.configureTestingModule({
            imports: [AdminFormContainer, DsvCardComponent, AdminFormComponent],
            providers: [
                provideZonelessChangeDetection(),
                provideTranslateService(),
                { provide: AdminService, useValue: adminServiceMock },
                {
                    provide: ActivatedRoute,
                    useValue: { params: of({ type: 'user', id: '42' }) },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AdminFormContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
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