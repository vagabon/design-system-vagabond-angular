import { Component, effect, input, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { JSONObject } from "@ng-vagabond-lab/ng-dsv/api";
import { TranslatePipe } from "@ngx-translate/core";
import { TableDto } from "../dto/table.dto";

@Component({
    selector: "dsv-table",
    standalone: true,
    imports: [
        RouterLink,
        TranslatePipe,
    ],
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.scss"]
})
export class TableComponent {

    url = input.required<string>();

    cells = input.required<TableDto[]>();
    datas = input.required<JSONObject[]>();

    max = input<number>(10);

    showDatas = signal<string[][]>([]);
    links = signal<(string | null)[]>([]);

    constructor() {
        effect(() => {
            let datas: JSONObject[] = this.datas();
            if (this.max() > 0) {
                datas = [];
                const links = [];
                for (let i = 0; i < this.max(); i++) {
                    let data = this.datas()?.[i];
                    if (data) {
                        links.push(data['id' as keyof JSONObject]);
                    } else {
                        data = { id: -1 * (i + 1) } as JSONObject
                        links.push(null);
                    }
                    datas.push(data);
                }
                this.links.set(links);
            }

            const showDatas: string[][] = [];
            datas.forEach(data => {
                const showData: string[] = [];
                showData.push(this.getValue(data, "id", false));
                this.cells().forEach(cell => {
                    showData.push(this.getValue(data, cell.name, cell.date ?? false));
                });
                showDatas.push(showData);
            })
            this.showDatas.set(showDatas);
        });
    }

    getValue(obj: JSONObject, key: string, isDate: boolean): any {
        let value: string = obj[key as keyof JSONObject];
        if (key.includes('.')) {
            const keys = key.split('.');
            let recurse: JSONObject = obj;
            keys.forEach(key2 => {
                if (recurse) {
                    if (Array.isArray(recurse)) {
                        recurse = (recurse as JSONObject[]).map(item => item[key2 as keyof JSONObject]).join(',') as JSONObject;
                    } else {
                        recurse = recurse[key2 as keyof JSONObject];
                    }
                }
            });
            value = recurse as string;
        }
        if (isDate && value) {
            value = this.formatDate(value);
        }
        return value;
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
}