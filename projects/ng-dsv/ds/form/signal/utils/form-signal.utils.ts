import { ChildFieldContext } from '@angular/forms/signals';

export const requiredTrim = (value: ChildFieldContext<string>): { kind: 'required' } | null =>
    value.value().trim() === '' ? { kind: 'required' } : null;
