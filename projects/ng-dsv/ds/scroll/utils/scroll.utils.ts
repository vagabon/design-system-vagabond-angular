import { ElementRef } from '@angular/core';

export const SCROLL_ID = '#main-scroll';
export const SCROLL_CLASS = '.scroll';

export const scrollToTop = (element: ElementRef, name: string = SCROLL_ID): void => {
    element.nativeElement.querySelector(name)?.scrollTo({ top: 0, behavior: 'smooth' });
};
export const scrollToClosestTop = (element: ElementRef, name: string = SCROLL_CLASS): void => {
    element.nativeElement.querySelector(name)?.closest(name)?.scrollTo(0, 0);
};

type BreakpointConfig = {
    min: number;
    small: number;
    normal: number;
};

const BREAKPOINTS: BreakpointConfig[] = [
    { min: 1500, small: 16, normal: 14 },
    { min: 1150, small: 14, normal: 12 },
    { min: 900, small: 14, normal: 10 },
    { min: 650, small: 14, normal: 8 },
    { min: 350, small: 8, normal: 6 },
    { min: 200, small: 6, normal: 3 },
    { min: 0, small: 4, normal: 2 },
];

export function getVisibleCount(width: number, small: boolean): number {
    const config = BREAKPOINTS.find((bp) => width >= bp.min)!;

    return small ? config.small : config.normal;
}
