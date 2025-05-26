import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  template: '',
})
export abstract class BaseFormComponent {
  protected readonly formBuilder = inject(FormBuilder);
  protected form!: FormGroup;

  ngOnInit() {
    this.afterInit();
  }

  ngOnCheck() {
    this.afterInit();
  }

  abstract afterInit(): void;

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulaire envoyé !', this.form.value);
    }
  }
}
