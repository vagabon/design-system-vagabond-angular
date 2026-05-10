import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvPaginateComponent } from './paginate.component';

describe('PaginateComponent', () => {
    let component: DsvPaginateComponent;
    let fixture: ComponentFixture<DsvPaginateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvPaginateComponent],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvPaginateComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('page', 1);
        fixture.componentRef.setInput('max', 10);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit selected page on gotoPage()', () => {
        const callbackSpy = vi.fn();
        component.callback.subscribe(callbackSpy);

        component.gotoPage(5);

        expect(callbackSpy).toHaveBeenCalledWith(5);
    });
});
