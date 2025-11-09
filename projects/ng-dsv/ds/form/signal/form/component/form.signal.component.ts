import { Component, inject, input, output } from '@angular/core';
import { FieldTree, submit } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-form-signal',
  imports: [DsvButtonComponent, RouterLink, TranslatePipe],
  templateUrl: './form.signal.component.html',
  styleUrl: '../../../legacy/form/component/form.component.scss',
})
export class FormSignalComponent {
  toastService = inject(ToastService);

  form = input.required<FieldTree<any, string | number>>();

  urlBack = input<string>();
  textValid = input<string>('ENREGISTRER');
  formValid = input<string>('Formulaire envoyé !');

  callback = output<ApiDto>();

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.form(), async (form) => {
      if (form().valid()) {
        console.log(form().value());
        this.callback.emit(form().value());
        this.toastService.showToast({
          text: this.formValid(),
        });
      } else {
        this.toastService.showToast({
          text: 'Erreur dans le formulaire !',
          type: 'error',
        });
      }
    });
  }
}
