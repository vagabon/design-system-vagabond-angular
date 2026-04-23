import { describe, expect, it } from 'vitest';
import { requiredTrim } from './form.signal.utils';

const makeContext = (value: string) =>
    ({
        value: () => value,
    }) as any;

describe('requiredTrim', () => {
    it('retourne null si la valeur est non vide', () => {
        expect(requiredTrim(makeContext('hello'))).toBeNull();
    });

    it('retourne null si la valeur contient des espaces autour du texte', () => {
        expect(requiredTrim(makeContext('  hello  '))).toBeNull();
    });

    it('retourne { kind: "required" } si la valeur est vide', () => {
        expect(requiredTrim(makeContext(''))).toEqual({ kind: 'required' });
    });

    it('retourne { kind: "required" } si la valeur ne contient que des espaces', () => {
        expect(requiredTrim(makeContext('   '))).toEqual({ kind: 'required' });
    });

    it('retourne { kind: "required" } si la valeur ne contient que des tabulations', () => {
        expect(requiredTrim(makeContext('\t\t'))).toEqual({ kind: 'required' });
    });

    it('retourne { kind: "required" } si la valeur ne contient que des sauts de ligne', () => {
        expect(requiredTrim(makeContext('\n\n'))).toEqual({ kind: 'required' });
    });
});
