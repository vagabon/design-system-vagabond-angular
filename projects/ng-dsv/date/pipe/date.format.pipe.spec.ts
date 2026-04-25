import { beforeEach, describe, expect, it } from 'vitest';
import { DateFormatPipe } from './date.format.pipe';

describe('DateFormatPipe', () => {
    let pipe: DateFormatPipe;

    beforeEach(() => {
        pipe = new DateFormatPipe();
    });

    it('should create', () => {
        expect(pipe).toBeTruthy();
    });

    it('should format a valid date', () => {
        const result = pipe.transform('2024-01-15');
        expect(result).toBeTruthy();
        expect(typeof result).toBe('string');
    });

    it('should handle an empty string', () => {
        const result = pipe.transform('');
        expect(result).toBeDefined();
    });

    it('should handle an invalid date', () => {
        const result = pipe.transform('not-a-date');
        expect(result).toBeDefined();
    });
});
