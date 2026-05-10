import { Component, effect, input, signal } from '@angular/core';

import { RouterLink } from '@angular/router';
import { JSONObject } from '@ng-vagabond-lab/ng-dsv/api';
import { TranslatePipe } from '@ngx-translate/core';
import { TableDto } from '../dto/table.dto';
import { getValue, initTable } from '../public-api';

@Component({
    selector: 'dsv-table',
    imports: [RouterLink, TranslatePipe],
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class DsvTableComponent {
    readonly url = input.required<string>();
    readonly cells = input.required<TableDto[]>();
    readonly datas = input.required<JSONObject[]>();
    readonly max = input<number>(10);

    readonly showDatas = signal<string[][]>([]);
    readonly links = signal<(string | null)[]>([]);

    constructor() {
        effect(() => {
            const { links, datas } = initTable(this.datas(), this.max());

            this.links.set(links);

            const showDatas: string[][] = [];
            datas.forEach((data) => {
                const showData: string[] = [];
                showData.push(getValue(data, 'id', false));
                this.cells()?.forEach((cell) => {
                    showData.push(getValue(data, cell.name, cell.date ?? false));
                });
                showDatas.push(showData);
            });
            this.showDatas.set(showDatas);
        });
    }
}
