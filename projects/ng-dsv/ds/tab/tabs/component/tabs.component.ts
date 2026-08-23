import { Component, effect, ElementRef, inject, input, output, viewChild, viewChildren } from '@angular/core';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { TabDto } from '../../public-api';
import { DsvTabComponent } from '../../tab/component/tab.component';

@Component({
    selector: 'dsv-tabs-component',
    imports: [DsvTabComponent],
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
})
export class DsvTabsComponent {
    readonly environmentService = inject(EnvironmentService);

    readonly tabs = input.required<TabDto[]>();
    readonly active = input.required<string>();

    readonly callback = output<TabDto>();

    readonly container = viewChild<ElementRef>('scrollContainer');
    readonly tabComponents = viewChildren(DsvTabComponent);

    constructor() {
        effect(() => {
            const activeId = this.active().trim();
            const currentTabs = this.tabs();
            const components = this.tabComponents();
            const containerEl = this.container()?.nativeElement;

            if (
                !this.environmentService.platformService.isPlatformBrowser() ||
                !activeId ||
                currentTabs.length === 0 ||
                components.length === 0
            ) {
                return;
            }

            const selectedIndex = currentTabs.findIndex((t) => t.id.trim() === activeId);

            if (selectedIndex !== -1 && components[selectedIndex]) {
                const targetEl = components[selectedIndex].elementRef.nativeElement as HTMLElement;
                const targetLeft = targetEl.offsetLeft;
                const targetWidth = targetEl.offsetWidth;
                const containerWidth = containerEl.offsetWidth;
                const scrollToPosition = targetLeft - containerWidth / 2 + targetWidth / 2;

                containerEl.scrollTo({
                    left: scrollToPosition,
                    behavior: 'smooth',
                });
            }
        });
    }
    doClick(tab: TabDto): void {
        this.callback.emit(tab);
    }
}
