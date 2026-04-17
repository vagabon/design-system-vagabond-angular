import { provideHttpClient } from '@angular/common/http';
import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ReactiveSearchbarComponent } from './reactive.searchbar.component';

describe('ReactiveSearchbarComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveSearchbarComponent],
            providers: [provideZonelessChangeDetection(), provideHttpClient()],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(ReactiveSearchbarComponent);
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
        expect(app.callbackSearch.emit).toHaveBeenCalledWith('search');
    });
});
