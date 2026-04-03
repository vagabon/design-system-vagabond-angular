import { ChildFieldContext } from "@angular/forms/signals";

export const requiredTrim = (value: ChildFieldContext<string>) => value.value().trim() != "" ? null : { kind: 'required' };