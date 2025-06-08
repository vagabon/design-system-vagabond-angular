import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  template: '',
})
export abstract class BaseFormComponent {
  protected readonly formBuilder = inject(FormBuilder);
  protected form!: FormGroup;
}
