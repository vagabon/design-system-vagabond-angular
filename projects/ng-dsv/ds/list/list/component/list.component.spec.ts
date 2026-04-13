import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
    let fixture: ComponentFixture<ListComponent>;
    let component: ListComponent;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [ListComponent],
            providers: [
                provideZonelessChangeDetection(),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});