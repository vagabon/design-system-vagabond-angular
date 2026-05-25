import { Component, effect, input, output, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { DsvFormSignalComponent, DsvFormSignalSelectComponent } from '@ng-vagabond-lab/ng-dsv/ds/form/signal';
import { MenuLanguageDto } from '../../dto/language/menu.language.dto';

@Component({
    selector: 'dsv-menu-language-form',
    imports: [DsvFormSignalComponent, DsvFormSignalSelectComponent],
    templateUrl: './menu-language-form.component.html',
    styleUrl: './menu-language-form.component.scss',
})
export class MenuLanguageFormComponent {
    readonly language = input<string>('');

    readonly callback = output<string>();

    readonly languageForm = form<MenuLanguageDto>(
        signal<MenuLanguageDto>({
            language: this.language(),
        }),
    );

    readonly languages: (ApiDto & { name: string })[] = [
        { id: 'fr', name: 'FR' },
        { id: 'en', name: 'EN' },
    ];

    constructor() {
        effect(() => {
            this.languageForm().reset({
                language: this.language(),
            });
        });
    }
}
