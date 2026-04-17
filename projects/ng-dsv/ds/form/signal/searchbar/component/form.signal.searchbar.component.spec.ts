import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FormSignalSearchbarComponent } from './form.signal.searchbar.component';

describe('FormSignalSearchbarComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormSignalSearchbarComponent],
            providers: [provideZonelessChangeDetection()],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(FormSignalSearchbarComponent);
        const app = fixture.componentInstance;
        app.search = signal('search') as unknown as InputSignal<string>;
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
