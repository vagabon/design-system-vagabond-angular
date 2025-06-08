import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginateComponent } from './paginate.component';

describe('PaginateComponent', () => {
    let component: PaginateComponent;
    let fixture: ComponentFixture<PaginateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PaginateComponent],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(PaginateComponent);
        component = fixture.componentInstance;

        component.page = signal(1) as unknown as InputSignal<number>;
        component.max = signal(10) as unknown as InputSignal<number>;
        component.nb = signal(100) as unknown as InputSignal<number>;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit selected page on gotoPage()', () => {
        const callbackSpy = jasmine.createSpy('callbackSpy');
        component.callback.subscribe(callbackSpy);

        component.gotoPage(5);

        expect(callbackSpy).toHaveBeenCalledWith(5);
    });
});
