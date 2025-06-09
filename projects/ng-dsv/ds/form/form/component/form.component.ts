import { Component, inject, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,
    DsvButtonComponent,
    RouterLink,
    TranslatePipe
  ],
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  toastService = inject(ToastService);

  form = input.required<FormGroup>();

  urlBack = input<string>();
  textValid = input<string>('ENREGISTRER');
  formValid = input<string>('Formulaire envoyé !');

  callback = output<ApiDto>();

  onSubmit() {
    if (this.form().valid) {
      this.callback.emit(this.form().value);
      if (this.textValid() !== '') {
        this.toastService.showToast({
          text: this.formValid(),
        })
      }
    } else {
      this.toastService.showToast({
        text: 'Erreur dans le formulaire !',
        type: 'error'
      })
    }
  }
}
