import { Component, effect, inject, signal } from '@angular/core';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { BaseRouteComponent } from '@ng-vagabond-lab/ng-dsv/base';
import { DsvCardComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { TabDto } from '@ng-vagabond-lab/ng-dsv/ds/tab';
import { PlatformService } from '@ng-vagabond-lab/ng-dsv/platform';
import { AdminFormComponent } from '../../component/form/admin.form.component';
import { AdminTabDto } from '../../dto/admin.dto';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'dsv-admin-form',
  imports: [DsvCardComponent, AdminFormComponent],
  templateUrl: './admin.form.container.html',
  styleUrls: ['./admin.form.container.scss'],
})
export class AdminFormContainer extends BaseRouteComponent {
  adminService = inject(AdminService);
  platformService = inject(PlatformService);

  tabs = signal<TabDto[]>([]);
  tab = signal<string>('user');
  tabConfig = signal<AdminTabDto | undefined>(undefined);

  constructor() {
    super();
    effect(() => {
      if (this.platformService.isPlatformBrowser()) {
        const id = this.routeParams()?.['id'];
        this.tab.set(this.routeParams()?.['type']);
        const tab = this.adminService
          .tabs()
          ?.tabs.find((tab) => tab.name === this.tab());
        this.tabConfig.set(tab);
        if (isNaN(id)) {
          this.adminService.data.set({} as ApiDto);
        } else {
          this.findById(this.routeParams()?.['id']);
        }
      }
    });
  }

  findById(id: string) {
    this.adminService.findById(this.tabConfig()?.name!, id);
  }

  sendForm(data: ApiDto) {
    const dataFusion = {
      ...this.adminService.data(),
      ...data,
    };
    if (!dataFusion.id) {
      this.adminService.post(this.tabConfig()?.name!, dataFusion);
    } else {
      this.adminService.put(this.tabConfig()?.name!, dataFusion);
    }
  }
}
