import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChildren, inject, input, TemplateRef } from '@angular/core';
import { DsvItemComponent } from '@ng-vagabond-lab/ng-dsv/ds/item';
import { DsvMenuComponent, MenuService } from '@ng-vagabond-lab/ng-dsv/ds/menu';
import { DsvThemeSwitchComponent } from '@ng-vagabond-lab/ng-dsv/ds/theme';
import { I18nService } from '@ng-vagabond-lab/ng-dsv/i18n';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/module/auth';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { MenuLanguageFormComponent } from '../component/language/menu-language-form.component';
import { MenuDto } from '../dto/menu.dto';
import { MenuSlotDirective } from '../slot/menu.slot';

@Component({
    selector: 'app-menu-container',
    imports: [
        DsvMenuComponent,
        DsvItemComponent,
        NgTemplateOutlet,
        DsvThemeSwitchComponent,
        MenuLanguageFormComponent,
    ],
    templateUrl: './menu.container.html',
    styleUrls: ['./menu.container.scss'],
})
export class MenuContainer {
    readonly authService = inject(AuthService);
    readonly routerService = inject(RouterService);
    readonly menuService = inject(MenuService);
    readonly i18nService = inject(I18nService);

    readonly slots = contentChildren(MenuSlotDirective);

    readonly menu = input<MenuDto>();

    getSlot(id: string): TemplateRef<any> | null {
        return this.slots()?.find((s) => s.menuSlot() === id)?.template ?? null;
    }

    isActive(url: string): boolean {
        return this.routerService.currentUrl().includes(url);
    }
}
