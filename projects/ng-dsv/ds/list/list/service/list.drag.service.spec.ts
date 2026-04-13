import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ListDragService } from './list.drag.service';

describe('ListDragService', () => {
  let service: ListDragService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        ListDragService,
      ],
    });

    service = TestBed.inject(ListDragService);
  });

  it('should dragSrcIndex to be init to null', () => {
    expect(service.dragSrcIndex()).toEqual(null);
  });
});