import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, input, signal, ViewChild } from '@angular/core';
import { TooltipPosition, TooltipPositionEnum } from '../dto/tooltip.dto';
import { getTooltipPosition } from '../utils/tooltip.utils';
@Component({
    selector: 'dsv-tooltip',
    imports: [CommonModule],
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class DsvTooltipComponent {
    text = input<string>('');
    position = input<TooltipPosition>(TooltipPositionEnum.TOP);

    visible = signal(false);

    positionClass = signal<TooltipPosition>(TooltipPositionEnum.TOP);

    @ViewChild('tooltipBox')
    tooltipBox!: ElementRef<HTMLElement>;

    @HostListener('window:resize')
    onResize() {
        this.adjustPosition();
    }

    @HostListener('mouseenter')
    onMouseEnter() {
        this.visible.set(true);
        this.adjustPosition();
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.visible.set(false);
    }

    adjustPosition() {
        setTimeout(() => {
            const tooltipEl = this.tooltipBox?.nativeElement;
            if (!tooltipEl) return;
            const rect = tooltipEl.getBoundingClientRect();

            this.positionClass.set(getTooltipPosition(this.position(), rect));
        });
    }
}