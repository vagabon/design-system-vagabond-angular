import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { SearchbarComponent } from '@ng-vagabond-lab/ng-dsv/ds/form/legacy';
import { DsvItemComponent } from '@ng-vagabond-lab/ng-dsv/ds/item';
import {
  ModalButtonComponent,
  ModalComponent,
  ModalService,
} from '@ng-vagabond-lab/ng-dsv/ds/modal';
import { ManyToManyDto } from '../../dto/admin.dto';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'admin-search-modal',
  imports: [
    DsvItemComponent,
    ModalButtonComponent,
    ModalComponent,
    SearchbarComponent,
  ],
  templateUrl: './admin.search.modal.container.html',
  styleUrls: ['./admin.search.modal.container.scss'],
})
export class AdminSearchModalContainer {
  modalService = inject(ModalService);
  adminService = inject(AdminService);

  m2em = input.required<ManyToManyDto>();

  search = signal<string>('');
  datas = signal<ApiDto[]>([]);

  callback = output<ApiDto>();

  constructor() {
    effect(() => {
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
    });
  }

  getValue(data: ApiDto, name: string) {
    return data[name as keyof ApiDto] as string;
  }

  doSearch(search: string) {
    this.search.set(search);
  }

  clickItem = (data: ApiDto) => {
    this.callback.emit(data);
    this.modalService.close('m2m');
  };
}
