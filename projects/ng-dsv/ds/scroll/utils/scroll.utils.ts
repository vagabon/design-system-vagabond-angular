import { ElementRef } from '@angular/core';

export const SCROLL_ID = '#main-scroll';
export const SCROLL_CLASS = '.scroll';

export const scrollToTop = (element: ElementRef, name: string = SCROLL_ID) => {
    element.nativeElement.querySelector(name)?.scrollTo({ top: 0, behavior: 'smooth' });
};
export const scrollToClosestTop = (element: ElementRef, name: string = SCROLL_CLASS) => {
    element.nativeElement.querySelector(name)?.closest(name)?.scrollTo(0, 0);
};
