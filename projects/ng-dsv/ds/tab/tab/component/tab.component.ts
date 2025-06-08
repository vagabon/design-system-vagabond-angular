import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TabDto } from "../dto/tab.dto";

@Component({
    selector: "app-tab-component",
    standalone: true,
    imports: [
        RouterLink,
    ],
    templateUrl: "./tab.component.html",
    styleUrls: ["./tab.component.scss"],
})
export class TabComponent {
    tab = input.required<TabDto>();
    isSelected = input<boolean>(false);

}