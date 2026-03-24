import { TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { UiSdkService } from './ui-sdk.service';

describe('UiSdkService', () => {
  let service: UiSdkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(UiSdkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
