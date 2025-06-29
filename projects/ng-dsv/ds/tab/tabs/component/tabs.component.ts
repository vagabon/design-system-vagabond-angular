import { Component, input, output } from '@angular/core';
import { TabDto } from '../../public-api';
import { TabComponent } from '../../tab/component/tab.component';

@Component({
  selector: 'dsv-tabs-component',
  imports: [TabComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  tabs = input.required<TabDto[]>();
  active = input.required<string>();

  callback = output<TabDto>();

  doClick(tab: TabDto) {
    this.callback.emit(tab);
  }
}
