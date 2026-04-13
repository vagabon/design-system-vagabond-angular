// date-utils.spec.ts
import { describe, expect, it } from 'vitest';
import { toBackendDate, toDateInputValue } from './date.utils';

describe('toDateInputValue', () => {
    it('retourne une chaîne vide si la valeur est null', () => {
        expect(toDateInputValue(null)).toBe('');
    });

    it('retourne une chaîne vide si la valeur est undefined', () => {
        expect(toDateInputValue(undefined)).toBe('');
    });

    it('retourne une chaîne vide si la valeur est une chaîne vide', () => {
        expect(toDateInputValue('')).toBe('');
    });

    it('tronque la partie time si le format est ISO datetime', () => {
        expect(toDateInputValue('2026-04-04T00:00:00')).toBe('2026-04-04');
    });

    it('tronque même si le time est non nul', () => {
        expect(toDateInputValue('2026-04-04T13:45:59')).toBe('2026-04-04');
    });

    it('retourne la valeur telle quelle si déjà au format yyyy-MM-dd', () => {
        expect(toDateInputValue('2026-04-04')).toBe('2026-04-04');
    });
});

describe('toBackendDate', () => {
    it('retourne une chaîne vide si la valeur est null', () => {
        expect(toBackendDate(null)).toBe('');
    });

    it('retourne une chaîne vide si la valeur est undefined', () => {
        expect(toBackendDate(undefined)).toBe('');
    });

    it('retourne une chaîne vide si la valeur est une chaîne vide', () => {
        expect(toBackendDate('')).toBe('');
    });

    it('ajoute T00:00:00 si le format est yyyy-MM-dd', () => {
        expect(toBackendDate('2026-04-04')).toBe('2026-04-04T00:00:00');
    });

    it('retourne la valeur telle quelle si déjà au format ISO datetime', () => {
        expect(toBackendDate('2026-04-04T00:00:00')).toBe('2026-04-04T00:00:00');
    });

    it('retourne la valeur telle quelle si le time est non nul', () => {
        expect(toBackendDate('2026-04-04T13:45:59')).toBe('2026-04-04T13:45:59');
    });
});