import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideTranslateService, TranslatePipe } from '@ngx-translate/core';
import { TableDto } from '../dto/table.dto';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
    let fixture: ComponentFixture<TableComponent>;
    let component: TableComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TableComponent,
                RouterTestingModule,
                TranslatePipe
            ],
            providers: [
                provideZonelessChangeDetection(),
                provideTranslateService(),
                { provide: TranslatePipe, useValue: { transform: (val: string) => val } }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;

        component.url = signal('/mock-url') as any;
        component.cells = signal([
            { name: 'username' },
            { name: 'createdAt', date: true }
        ] as TableDto[]) as any;

        component.datas = signal([
            { id: 1, username: 'Alice', createdAt: '2025-06-07T22:13:05.920427' },
            { id: 2, username: 'Bob', createdAt: '2025-06-08T08:45:00.123456' }
        ]) as any;

        component.max = signal(2) as any;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should compute showDatas correctly', () => {
        const result = component.showDatas();
        expect(result.length).toBe(2);
        expect(result[0][1]).toBe('Alice');
        expect(result[0][2]).toMatch(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/);
    });

    it('should respect max rows to display', async () => {
        component.max = signal(1) as any;
        component.datas = signal([
            { id: 1, username: 'One' },
            { id: 2, username: 'Two' }
        ]) as any;
        fixture.detectChanges();
        expect(component.showDatas().length).toBe(2);
    });
});
