import { Component, input } from "@angular/core";
import { TabDto } from "../../public-api";
import { TabComponent } from "../../tab/component/tab.component";

@Component({
    selector: "dsv-tabs-component",
    standalone: true,
    imports: [
        TabComponent
    ],
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"],
})
export class TabsComponent {
    tabs = input.required<TabDto[]>();
    active = input.required<string>();

}