import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChildren, inject, input, TemplateRef } from '@angular/core';
import { DsvItemComponent } from '@ng-vagabond-lab/ng-dsv/ds/item';
import { DsvMenuComponent, MenuService } from '@ng-vagabond-lab/ng-dsv/ds/menu';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/modules/auth';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { MenuDto } from '../dto/menu.dto';
import { MenuSlotDirective } from '../slot/menu.slot';

@Component({
    selector: 'app-menu-container',
    imports: [DsvMenuComponent, DsvItemComponent, NgTemplateOutlet],
    templateUrl: './menu.container.html',
    styleUrls: ['./menu.container.scss'],
})
export class MenuContainer {
    readonly authService = inject(AuthService);
    readonly routerService = inject(RouterService);
    readonly menuService = inject(MenuService);

    readonly slots = contentChildren(MenuSlotDirective);

    readonly menu = input<MenuDto>();

    getSlot(id: string): TemplateRef<any> | null {
        return this.slots()?.find((s) => s.menuSlot === id)?.tpl ?? null;
    }

    isActive(url: string) {
        return this.routerService.currentUrl().includes(url);
    }
}
