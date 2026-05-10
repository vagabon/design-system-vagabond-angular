import { ComponentFixture, TestBed } from '@angular/core/testing';
import { isCallback } from '@ng-vagabond-lab/ng-dsv/base';
import { DsvAvatarComponent } from './avatar.component';

vi.mock('@ng-vagabond-lab/ng-dsv/base', () => ({
    isCallback: vi.fn(),
}));

describe('DsvAvatarComponent', () => {
    let component: DsvAvatarComponent;
    let fixture: ComponentFixture<DsvAvatarComponent>;

    beforeEach(async () => {
        vi.mocked(isCallback).mockReturnValue(false);

        (window as any).google = { accounts: { id: { prompt: () => {} } } };
        await TestBed.configureTestingModule({
            imports: [DsvAvatarComponent],
            providers: [],
        }).compileComponents();
        fixture = TestBed.createComponent(DsvAvatarComponent);
        component = fixture.componentInstance;
    });

    it('should not emit callback if no listener exists', () => {
        vi.mocked(isCallback).mockReturnValue(true);
        const emitSpy = vi.spyOn(component.callback, 'emit');
        fixture.detectChanges();

        fixture.nativeElement.click();
        expect(emitSpy).toHaveBeenCalled();
    });
});
