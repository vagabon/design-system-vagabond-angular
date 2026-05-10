import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { DsvMenuButtonComponent, MenuService } from '@ng-vagabond-lab/ng-dsv/ds/menu';
import { RouterInternalPipe } from '@ng-vagabond-lab/ng-dsv/router';

@Component({
    selector: 'dsv-header',
    imports: [CommonModule, DsvMenuButtonComponent, RouterInternalPipe],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class DsvHeaderComponent {
    readonly menuService = inject(MenuService);

    readonly img = input<string>();
    readonly titleText = input<string>('');
    readonly withMenu = input<boolean>(true);

    readonly titleTextParts = computed(() => this.titleText().split(' '));

    doToogleMenu(): void {
        this.menuService.toogleMenu();
    }
}
