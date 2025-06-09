import { Component, effect, inject, signal } from "@angular/core";
import { ApiDto } from "@ng-vagabond-lab/ng-dsv/api";
import { BaseRouteComponent } from "@ng-vagabond-lab/ng-dsv/base";
import { DsvCardComponent } from "@ng-vagabond-lab/ng-dsv/ds/card";
import { TabDto } from "@ng-vagabond-lab/ng-dsv/ds/tab";
import { AdminFormComponent } from "../../component/form/admin.form.component";
import { AdminTabDto } from "../../dto/admin.dto";
import { AdminService } from "../../service/admin.service";

@Component({
    selector: 'dsv-admin-form',
    standalone: true,
    imports: [
        DsvCardComponent,
        AdminFormComponent
    ],
    templateUrl: './admin.form.container.html',
    styleUrls: ['./admin.form.container.scss']
})
export class AdminFormContainer extends BaseRouteComponent {
    adminService = inject(AdminService);

    tabs = signal<TabDto[]>([]);
    tab = signal<string>('user');
    tabConfig = signal<AdminTabDto | undefined>(undefined);

    constructor() {
        super();
        effect(() => {
            this.tab.set(this.routeParams()?.['type']);
            const tab = this.adminService.tabs()?.tabs.find((tab) => tab.name === this.tab());
            this.tabConfig.set(tab);
            this.findById(this.routeParams()?.['id']);
        });
    }

    findById(id: string) {
        this.adminService.findById(this.tabConfig()?.name!, id);
    }

    sendForm(data: ApiDto) {
        this.adminService.put(this.tabConfig()?.name!, {
            ...this.adminService.data(),
            ...data
        });
    }
}