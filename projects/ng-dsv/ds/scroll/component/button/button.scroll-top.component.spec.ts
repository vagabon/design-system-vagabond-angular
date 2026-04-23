import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { beforeEach, describe, expect, it } from 'vitest';
import { ButtonScrollTopComponent } from './button.scroll-top.component';

describe('ButtonScrollTopComponent', () => {
    let component: ButtonScrollTopComponent;
    let fixture: ComponentFixture<ButtonScrollTopComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonScrollTopComponent, DsvButtonComponent],
            providers: [provideZonelessChangeDetection()],
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonScrollTopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set show to true when scroll > 400', () => {
        fixture = TestBed.createComponent(ButtonScrollTopComponent);
        component = fixture.componentInstance;
        component.scroll = signal(800) as unknown as InputSignal<number>;
        fixture.detectChanges();

        expect(component.show()).toBe(true);
    });

    it('should set show to false when scroll <= 400', () => {
        component.scroll = signal(200) as unknown as InputSignal<number>;
        expect(component.show()).toBe(false);
    });
});
