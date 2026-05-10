import { Component, input, output } from '@angular/core';
import { TabDto } from '../../public-api';
import { DsvTabComponent } from '../../tab/component/tab.component';

@Component({
    selector: 'dsv-tabs-component',
    imports: [DsvTabComponent],
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
})
export class DsvTabsComponent {
    readonly tabs = input.required<TabDto[]>();
    readonly active = input.required<string>();

    readonly callback = output<TabDto>();

    doClick(tab: TabDto): void {
        this.callback.emit(tab);
    }
}
