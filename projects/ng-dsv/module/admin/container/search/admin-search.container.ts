import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BaseRouteContainer } from '@ng-vagabond-lab/ng-dsv/base';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { DsvCardComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { DsvFormSignalSearchbarComponent } from '@ng-vagabond-lab/ng-dsv/ds/form/signal';
import { DsvPaginateComponent } from '@ng-vagabond-lab/ng-dsv/ds/paginate';
import { DsvTabsComponent, TabDto } from '@ng-vagabond-lab/ng-dsv/ds/tab';
import { DsvTableComponent } from '@ng-vagabond-lab/ng-dsv/ds/table';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { AdminTabDto } from '../../dto/admin.dto';
import { AdminService } from '../../service/admin.service';

@Component({
    selector: 'dsv-admin-search',
    imports: [
        DsvCardComponent,
        DsvButtonComponent,
        DsvTabsComponent,
        DsvTableComponent,
        DsvPaginateComponent,
        RouterLink,
        DsvFormSignalSearchbarComponent,
    ],
    templateUrl: './admin-search.container.html',
    styleUrls: ['./admin-search.container.scss'],
})
export class AdminSearchContainer extends BaseRouteContainer {
    readonly adminService = inject(AdminService);
    readonly platformService = inject(PlatformService);

    readonly tabs = signal<TabDto[]>([]);
    readonly tab = signal<string>('user');
    readonly tabConfig = signal<AdminTabDto | undefined>(undefined);

    readonly load = signal<Record<string, boolean>>({});

    constructor() {
        super();
        effect(() => {
            if (this.platformService.isPlatformBrowser()) {
                this.tab.set(this.routeParams()?.['type']);
                const tab = this.adminService.tabs()?.tabs.find((tab) => tab.name === this.tab());
                this.tabConfig.set(tab);
                if (!this.load()[this.routeParams()?.['type']]) {
                    this.load.update((s) => ({ ...s, [this.tabConfig()?.name!]: true }));
                    this.gotoPage(0);
                }
            }
        });
        effect(() => {
            if (this.platformService.isPlatformBrowser()) {
                const tabs = this.adminService.tabs()?.tabs;
                const tabsDtos: TabDto[] = [];
                if (tabs) {
                    tabs.forEach((tab) => {
                        const tabsDto = {} as TabDto;
                        tabsDto.id = tab.name;
                        tabsDto.title = tab.name;
                        tabsDto.url = '/admin/' + tab.name;
                        tabsDtos.push(tabsDto);
                    });
                }
                this.tabs.set(tabsDtos);
            }
        });
    }

    gotoPage(page: number, search: string = ''): void {
        this.adminService.page.update((s) => ({ ...s, [this.tabConfig()?.name!]: page }));
        this.adminService.search.update((s) => ({ ...s, [this.tabConfig()?.name!]: search }));
        this.adminService.get(
            this.tabConfig()?.name!,
            this.tabConfig()?.findByChamps! + '>>' + this.tabConfig()?.sortBy,
            search,
            page,
            this.adminService.tabs()?.max,
        );
    }
}
