import { Component, effect, inject, signal } from "@angular/core";
import { BaseRouteComponent } from "@ng-vagabond-lab/ng-dsv/base";
import { PaginateComponent } from "@ng-vagabond-lab/ng-dsv/ds/paginate";
import { TabDto, TabsComponent } from "@ng-vagabond-lab/ng-dsv/ds/tab";
import { TableComponent } from "@ng-vagabond-lab/ng-dsv/ds/table";
import { v4 as uuidv4 } from 'uuid';
import { AdminTabDto } from "../../dto/admin.dto";
import { AdminService } from "../../service/admin.service";


@Component({
    selector: "app-admin-search",
    standalone: true,
    imports: [
        TabsComponent,
        TableComponent,
        PaginateComponent
    ],
    templateUrl: "./admin.search.container.html",
    styleUrls: ["./admin.search.container.scss"]
})
export class AdminSearchContainer extends BaseRouteComponent {
    adminService = inject(AdminService);

    tabs = signal<TabDto[]>([]);
    tab = signal<string>('user');
    tabConfig = signal<AdminTabDto | undefined>(undefined);

    page = signal<number>(0);

    constructor() {
        super();
        effect(() => {
            this.tab.set(this.routeParams()?.['type']);
            const tab = this.adminService.tabs()?.tabs.find((tab) => tab.name === this.tab())
            this.tabConfig.set(tab);
            this.gotoPage(0);
        });
        effect(() => {
            const tabs = this.adminService.tabs()?.tabs;
            const tabsDtos: TabDto[] = [];
            if (tabs) {
                tabs.forEach((tab) => {
                    const tabsDto = {} as TabDto;
                    tabsDto.id = uuidv4();
                    tabsDto.title = tab.name;
                    tabsDto.url = '/admin/' + tab.name;
                    tabsDtos.push(tabsDto);
                });
            }
            this.tabs.set(tabsDtos);
        });
    }

    gotoPage(page: number) {
        this.page.set(page);
        this.adminService.get(this.tabConfig()?.name!, this.tabConfig()?.findByChamps!, '', page, this.adminService.tabs()?.max);
    }
}