import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  template: '',
})
export abstract class BaseFormComponent {
  protected form!: FormGroup;

  constructor(protected readonly formBuilder: FormBuilder) {}

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
