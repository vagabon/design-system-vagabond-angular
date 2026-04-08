import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastDto } from '../dto/toast.dto';
import { DURATION_DEFAULT, DURATION_TIMEOUT, ToastService } from './toast.service';

describe('ToastService', () => {
    let service: ToastService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                ToastService
            ],
        });
        service = TestBed.inject(ToastService);
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should add a toast with default values and uuid', () => {
        const toast: ToastDto = { text: 'Test toast' };

        service.showToast(toast);

        const addedToast = service.toasts().find(t => t.text === 'Test toast');

        expect(addedToast).toBeDefined();
        expect(addedToast!.uuid).toBeDefined();
        expect(addedToast!.type).toBe('success');
        expect(addedToast!.duration).toBe(DURATION_DEFAULT);
        expect(addedToast!.remainingDuration).toBe(DURATION_DEFAULT);
        expect(addedToast!.filled).toBe(false);
    });

    it('should remove toast from queue', () => {
        const toast: ToastDto = { text: 'Test toast' };
        service.showToast(toast);

        const uuid = service.toasts()[0].uuid!;
        service.removeToastFromQueue(uuid);

        expect(service.toasts().find(t => t.uuid === uuid)).toBeUndefined();
    });

    it('should close toast from toastShows', () => {
        const toast: ToastDto = { text: 'Test toast' };
        toast.uuid = '1234';
        service.toastShows.update(ts => [...ts, toast]);

        service.closeToast('1234');

        setInterval(() => {
            expect(service.toastShows().find(t => t.uuid === '1234')?.open).toBe(false);
        }, 500);
    });

    it('should consume toast, update durationLeft and close after duration', () => {
        const toast: ToastDto = { text: 'Consume toast', duration: 50 };
        service.showToast(toast);

        const toastFromQueue = service.toasts()[0];
        service.consumeToast(toastFromQueue);

        expect(service.toastShows().find(t => t.uuid === toastFromQueue.uuid)).toBeDefined();

        for (let elapsed = DURATION_TIMEOUT; elapsed <= 60; elapsed += DURATION_TIMEOUT) {
            vi.advanceTimersByTime(DURATION_TIMEOUT);

            const toastInShow = service.toastShows().find(t => t.uuid === toastFromQueue.uuid);
            if (elapsed < toast.duration!) {
                expect(toastInShow?.remainingDuration).toBeCloseTo(toast.duration! - elapsed, 1);
            }
        }
    });
});