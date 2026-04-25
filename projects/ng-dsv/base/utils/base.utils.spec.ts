import { Component, output, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { isCallback, generateArray } from './base.utils';

@Component({ selector: 'test-host', template: '' })
class TestHostComponent {
    readonly emitter = output<void>();
}

const setupEmitter = () => {
    TestBed.configureTestingModule({
        imports: [TestHostComponent],
        providers: [provideZonelessChangeDetection()],
    });
    return TestBed.createComponent(TestHostComponent).componentInstance.emitter;
};

describe('isCallback', () => {
    it('When output has no listeners, Then should return false', () => {
        expect(isCallback(setupEmitter())).toBe(false);
    });

    it('When output has listeners, Then should return true', () => {
        const emitter = setupEmitter();
        emitter.subscribe(() => {});
        expect(isCallback(emitter)).toBe(true);
    });
});

describe('generateArray', () => {
    it('When called with no argument, Then should return array of 20 elements starting from 0', () => {
        const result = generateArray();
        expect(result).toHaveLength(20);
        expect(result[0]).toBe(0);
        expect(result[19]).toBe(19);
    });

    it('When called with a custom length, Then should return array of correct length', () => {
        expect(generateArray(5)).toEqual([0, 1, 2, 3, 4]);
    });

    it('When called with 0, Then should return empty array', () => {
        expect(generateArray(0)).toEqual([]);
    });
});
