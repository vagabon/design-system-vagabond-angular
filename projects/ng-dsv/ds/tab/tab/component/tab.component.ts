import { Component, ElementRef, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TabDto } from '../dto/tab.dto';

@Component({
    selector: 'dsv-tab-component',
    imports: [TranslatePipe, RouterLink],
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
})
export class DsvTabComponent {
    readonly tab = input.required<TabDto>();
    readonly isSelected = input<boolean>(false);

    readonly callback = output<TabDto>();

    readonly elementRef = inject(ElementRef);

    doClick(event: Event, tab: TabDto): void {
        if (!tab.url) {
            event.stopPropagation();
            this.callback.emit(tab);
        }
    }
}
