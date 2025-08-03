import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BaseRouteComponent } from '@ng-vagabond-lab/ng-dsv/base';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { DsvCardComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { PaginateComponent } from '@ng-vagabond-lab/ng-dsv/ds/paginate';
import { TabDto, TabsComponent } from '@ng-vagabond-lab/ng-dsv/ds/tab';
import { TableComponent } from '@ng-vagabond-lab/ng-dsv/ds/table';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { AdminTabDto } from '../../dto/admin.dto';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-search',
  imports: [
    DsvCardComponent,
    DsvButtonComponent,
    TabsComponent,
    TableComponent,
    PaginateComponent,
    RouterLink,
  ],
  templateUrl: './admin.search.container.html',
  styleUrls: ['./admin.search.container.scss'],
})
export class AdminSearchContainer extends BaseRouteComponent {
  adminService = inject(AdminService);
  platformService = inject(PlatformService);

  tabs = signal<TabDto[]>([]);
  tab = signal<string>('user');
  tabConfig = signal<AdminTabDto | undefined>(undefined);

  page = signal<number>(0);

  constructor() {
    super();
    effect(() => {
      if (this.platformService.isPlatformBrowser()) {
        this.tab.set(this.routeParams()?.['type']);
        const tab = this.adminService
          .tabs()
          ?.tabs.find((tab) => tab.name === this.tab());
        this.tabConfig.set(tab);
        this.gotoPage(0);
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

  gotoPage(page: number) {
    this.page.set(page);
    this.adminService.get(
      this.tabConfig()?.name!,
      this.tabConfig()?.findByChamps!,
      '',
      page,
      this.adminService.tabs()?.max,
    );
  }
}
