import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslatePipe } from '@ngx-translate/core';
import { DsvTableComponent } from './table.component';

describe('TableComponent', () => {
    let fixture: ComponentFixture<DsvTableComponent>;
    let component: DsvTableComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvTableComponent, TranslatePipe],
            providers: [
                provideRouter([]),
                provideTranslateService(),
                { provide: TranslatePipe, useValue: { transform: (val: string) => val } },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvTableComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('url', '/mock-url');
        fixture.componentRef.setInput('cells', [{ name: 'username' }, { name: 'createdAt', date: true }]);
        fixture.componentRef.setInput('datas', [
            { id: 1, username: 'Alice', createdAt: '2025-06-07T22:13:05.920427' },
            { id: 2, username: 'Bob', createdAt: '2025-06-08T08:45:00.123456' },
        ]);
        fixture.componentRef.setInput('max', 2);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should compute showDatas correctly', () => {
        const result = component.showDatas();
        expect(result.length).toBe(2);
        expect(result[0][1]).toBe('Alice');
        expect(result[0][2]).toBe('07/06/2025 22:13:05');
    });

    it('should respect max rows to display', async () => {
        fixture.componentRef.setInput('max', 1);
        fixture.componentRef.setInput('datas', [
            { id: 1, username: 'One' },
            { id: 2, username: 'Two' },
        ]);
        fixture.detectChanges();
        expect(component.showDatas().length).toBe(1);
    });
});
