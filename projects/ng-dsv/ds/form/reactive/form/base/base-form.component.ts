import { Directive, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Directive()
export abstract class DsvBaseFormReactiveComponent {
    protected readonly formBuilder = inject(FormBuilder);
    protected form!: FormGroup;
}
