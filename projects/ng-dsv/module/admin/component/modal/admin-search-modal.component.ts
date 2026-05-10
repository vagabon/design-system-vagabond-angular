import { Component, effect, inject, input, output, signal } from '@angular/core';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { BaseContainer } from '@ng-vagabond-lab/ng-dsv/base';
import { DsvFormReactiveSearchbarComponent } from '@ng-vagabond-lab/ng-dsv/ds/form/reactive';
import { DsvItemComponent } from '@ng-vagabond-lab/ng-dsv/ds/item';
import { DsvModalButtonComponent, DsvModalComponent, ModalService } from '@ng-vagabond-lab/ng-dsv/ds/modal';
import { ManyToManyDto } from '../../dto/admin.dto';
import { AdminService } from '../../service/admin.service';

@Component({
    selector: 'dsv-admin-search-modal',
    imports: [
        DsvItemComponent,
        DsvModalButtonComponent,
        DsvModalComponent,
        DsvFormReactiveSearchbarComponent,
    ],
    templateUrl: './admin-search-modal.component.html',
    styleUrls: ['./admin-search-modal.component.scss'],
})
export class AdminSearchModalContainer extends BaseContainer {
    readonly modalService = inject(ModalService);
    readonly adminService = inject(AdminService);

    readonly m2em = input.required<ManyToManyDto>();

    readonly search = signal<string>('');
    readonly datas = signal<ApiDto[]>([]);

    readonly callback = output<ApiDto>();

    constructor() {
        super();
        this.requiredRole.set('ADMIN');
        effect(() => {
            if (this.modalService.getSignal('m2m')) {
                this.adminService.get(
                    this.m2em().endPoint,
                    this.m2em().fields,
                    this.search(),
                    0,
                    500,
                    (data) => {
                        this.datas.set(data.content);
                    },
                );
            }
        });
    }

    getValue(data: ApiDto, name: string): string {
        return data[name as keyof ApiDto] as string;
    }

    doSearch(search: string): void {
        this.search.set(search);
    }

    clickItem = (data: ApiDto): void => {
        this.callback.emit(data);
        this.modalService.close('m2m');
    };
}
