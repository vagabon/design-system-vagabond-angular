import { ChildFieldContext } from '@angular/forms/signals';

export const requiredTrim = (value: ChildFieldContext<string>) =>
    value.value().trim() === '' ? { kind: 'required' } : null;
