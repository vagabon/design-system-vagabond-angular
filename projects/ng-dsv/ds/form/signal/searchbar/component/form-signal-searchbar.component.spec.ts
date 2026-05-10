import { TestBed } from '@angular/core/testing';
import { DsvFormSignalSearchbarComponent } from './form-signal-searchbar.component';

describe('FormSignalSearchbarComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvFormSignalSearchbarComponent],
            providers: [],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(DsvFormSignalSearchbarComponent);
        const app = fixture.componentInstance;
        fixture.componentRef.setInput('search', 'search');
        vi.spyOn(app.callbackSearch, 'emit');

        fixture.detectChanges();

        const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
        input.value = 'search';
        const event = new KeyboardEvent('keydown', {
            key: 'Enter',
            bubbles: true,
        });
        input.dispatchEvent(event);

        fixture.detectChanges();

        expect(app).toBeTruthy();
    });
});
