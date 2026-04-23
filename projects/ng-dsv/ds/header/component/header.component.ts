import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { DsvMenuButtonComponent, MenuService } from '@ng-vagabond-lab/ng-dsv/ds/menu';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';

@Component({
    selector: 'dsv-header',
    imports: [CommonModule, DsvMenuButtonComponent],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class DsvHeaderComponent {
    private readonly router = inject(RouterService).router;
    private readonly menuService = inject(MenuService);

    img = input<string>();
    titleText = input<string>('');
    withMenu = input<boolean>(true);

    titleTextParts = computed(() => this.titleText().split(' '));

    doToogleMenu() {
        this.menuService.toogleMenu();
    }

    goToHome(event: Event) {
        event.stopPropagation();
        event.preventDefault();
        this.router.navigate(['/']);
    }
}
