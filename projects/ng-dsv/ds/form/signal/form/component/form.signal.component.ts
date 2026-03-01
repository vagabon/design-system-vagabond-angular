import { Component, computed, inject, input, output } from '@angular/core';
import { FieldTree, submit } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { isCallback } from '@ng-vagabond-lab/ng-dsv/base';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { ToastService } from '@ng-vagabond-lab/ng-dsv/ds/toast';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-form-signal',
  imports: [DsvButtonComponent, RouterLink, TranslatePipe],
  templateUrl: './form.signal.component.html',
  styleUrl: '../../../reactive/form/component/form.reactive.component.scss',
})
export class FormSignalComponent<T> {
  toastService = inject(ToastService);

  form = input.required<FieldTree<T, string | number>>();

  urlBack = input<string>();
  textValid = input<string>('ENREGISTRER');
  formValid = input<string>('Formulaire envoyé !');

  callbackBack = output<void>();
  callback = output<ApiDto>();

  isCallbackBack = computed(() => isCallback(this.callbackBack));

  goBack() {
    this.callbackBack.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.form(), async (form) => {
      if (form().valid()) {
        this.callback.emit(form().value() as ApiDto);
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
