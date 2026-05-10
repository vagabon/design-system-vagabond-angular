import { Component, ElementRef, input, signal, ViewChild } from '@angular/core';
import { TooltipPosition, TooltipPositionEnum } from '../dto/tooltip.dto';
import { getTooltipPosition } from '../utils/tooltip.utils';
@Component({
    selector: 'dsv-tooltip',
    imports: [],
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    host: {
        '(window:resize)': 'onResize()',
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()',
    },
})
export class DsvTooltipComponent {
    readonly text = input<string>('');
    readonly position = input<TooltipPosition>(TooltipPositionEnum.TOP);

    readonly visible = signal<boolean>(false);
    readonly opacity = signal<number>(0);

    readonly positionClass = signal<TooltipPosition>(TooltipPositionEnum.TOP);

    @ViewChild('tooltipBox')
    readonly tooltipBox!: ElementRef<HTMLElement>;

    onResize(): void {
        this.adjustPosition();
    }

    onMouseEnter(): void {
        this.visible.set(true);
        this.adjustPosition();
    }

    onMouseLeave(): void {
        this.opacity.set(0);
        this.visible.set(false);
    }

    private adjustPosition(): void {
        setTimeout(() => {
            const tooltipEl = this.tooltipBox?.nativeElement;
            if (!tooltipEl) return;
            const rect = tooltipEl.getBoundingClientRect();

            this.positionClass.set(getTooltipPosition(this.position(), rect));
            this.opacity.set(0.9);
        });
    }
}
