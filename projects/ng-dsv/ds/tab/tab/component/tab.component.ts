import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TabDto } from '../dto/tab.dto';

@Component({
  selector: 'app-tab-component',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  tab = input.required<TabDto>();
  isSelected = input<boolean>(false);

  callback = output<TabDto>();

  doClick(event: Event, tab: TabDto) {
    if (!tab.url) {
      event.stopPropagation();
      this.callback.emit(tab);
    }
  }
}
