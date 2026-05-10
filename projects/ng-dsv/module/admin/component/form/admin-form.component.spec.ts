import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { provideTranslateService } from '@ngx-translate/core';
import { FormDto } from '../../dto/admin.dto';
import { AdminFormComponent } from './admin-form.component';

describe('AdminFormComponent', () => {
    let fixture: ComponentFixture<AdminFormComponent>;
    let component: AdminFormComponent;

    const mockData: ApiDto = {
        id: 1,
        name: 'Test',
        active: true,
        createdAt: '2024-01-01T10:00:00Z',
    } as ApiDto;

    const formConf: FormDto[] = [
        { name: 'name', type: 'text', required: true, disabled: false } as FormDto,
        { name: 'active', type: 'checkbox', required: false, disabled: false } as FormDto,
        { name: 'createdAt', type: 'datetime-local', required: false, disabled: false } as FormDto,
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminFormComponent, ReactiveFormsModule],
            providers: [FormBuilder, provideTranslateService()],
        }).compileComponents();

        fixture = TestBed.createComponent(AdminFormComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('data', mockData);
        fixture.componentRef.setInput('formConf', formConf);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    describe('initialisation', () => {
        it('should create the component', () => {
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should build form controls from formConf', () => {
            fixture.detectChanges();
            expect(component['form'].contains('name')).toBe(true);
            expect(component['form'].contains('active')).toBe(true);
            expect(component['form'].contains('createdAt')).toBe(true);
        });

        it('should set initial values from data input', () => {
            fixture.detectChanges();
            expect(component['form'].get('name')?.value).toBe('Test');
            expect(component['form'].get('active')?.value).toBe(true);
        });

        it('should trim datetime-local value to 19 chars', () => {
            fixture.detectChanges();
            expect(component['form'].get('createdAt')?.value).toBe('2024-01-01T10:00:00');
        });

        it('should set Validators.required on required fields', () => {
            fixture.detectChanges();
            const nameControl = component['form'].get('name');
            expect(nameControl?.hasValidator(Validators.required)).toBe(true);
        });

        it('should not set Validators.required on non-required fields', () => {
            fixture.detectChanges();
            const activeControl = component['form'].get('active');
            expect(activeControl?.hasValidator(Validators.required)).toBe(false);
        });

        it('should disable control when conf.disabled is true', () => {
            fixture.componentRef.setInput('formConf', [
                { name: 'name', type: 'text', required: false, disabled: true },
            ]);
            fixture.detectChanges();
            expect(component['form'].get('name')?.disabled).toBe(true);
        });
    });

    describe('sendForm', () => {
        beforeEach(() => fixture.detectChanges());

        it('should emit callback with data', () => {
            const emitSpy = vi.spyOn(component.callback, 'emit');
            component.sendForm(mockData);
            expect(emitSpy).toHaveBeenCalledWith(mockData);
        });

        it('should append Z to datetime-local value if missing', () => {
            const emitSpy = vi.spyOn(component.callback, 'emit');
            const data = { ...mockData, createdAt: '2024-01-01T10:00:00' } as ApiDto;

            component.sendForm(data);

            expect(emitSpy).toHaveBeenCalledWith(
                expect.objectContaining({ createdAt: '2024-01-01T10:00:00Z' }),
            );
        });

        it('should not append Z if datetime-local value already ends with Z', () => {
            const emitSpy = vi.spyOn(component.callback, 'emit');
            const data = { ...mockData, createdAt: '2024-01-01T10:00:00Z' } as ApiDto;

            component.sendForm(data);

            expect(emitSpy).toHaveBeenCalledWith(
                expect.objectContaining({ createdAt: '2024-01-01T10:00:00Z' }),
            );
        });
    });

    describe('removeValue', () => {
        beforeEach(() => fixture.detectChanges());

        it('should remove item by id from form value array', () => {
            component['form'].value['items'] = [{ id: 1 }, { id: 2 }] as ApiDto[];

            component.removeValue('items', 1)();

            expect(component['form'].value['items']).toEqual([{ id: 2 }]);
        });
    });

    describe('addValue', () => {
        beforeEach(() => fixture.detectChanges());

        it('should add item to form value array if not already present', () => {
            component['form'].value['items'] = [{ id: 1 }] as ApiDto[];
            const newItem = { id: 2 } as ApiDto;

            component.addValue('items')(newItem);

            expect(component['form'].value['items']).toEqual([{ id: 1 }, { id: 2 }]);
        });

        it('should not add item if already present', () => {
            component['form'].value['items'] = [{ id: 1 }] as ApiDto[];
            const duplicate = { id: 1 } as ApiDto;

            component.addValue('items')(duplicate);

            expect(component['form'].value['items']).toEqual([{ id: 1 }]);
        });
    });
});
