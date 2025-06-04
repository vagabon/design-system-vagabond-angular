import { TestBed } from '@angular/core/testing';
import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
    let service: ScrollService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ScrollService],
        });
        service = TestBed.inject(ScrollService);
    });

    it('should save and retrieve scroll position for current URL', () => {
        const fakeUrl = 'http://localhost/test';

        expect(service.getScroll()).toBeUndefined();

        service.saveScroll(123);

        expect(service.getScroll()).toBe(123);

        service.saveScroll(456);
        expect(service.getScroll()).toBe(456);
    });
});
