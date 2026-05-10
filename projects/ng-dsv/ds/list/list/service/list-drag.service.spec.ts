import { TestBed } from '@angular/core/testing';
import { ListDragService } from './list-drag.service';

describe('ListDragService', () => {
    let service: ListDragService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ListDragService],
        });

        service = TestBed.inject(ListDragService);
    });

    it('should dragSrcIndex to be init to null', () => {
        expect(service.dragSrcIndex()).toEqual(null);
    });
});
