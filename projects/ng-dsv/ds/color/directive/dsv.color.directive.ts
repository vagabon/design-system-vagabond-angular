import { Directive, effect, ElementRef, inject, input, Renderer2, signal } from '@angular/core';

@Directive({
  selector: '[colorClass]'
})
export class DsvColorDirective {
  element = inject(ElementRef);
  renderer = inject(Renderer2);

  colorClass = input<string>('primary');

  previousClass = signal<string | null>(null);

  constructor() {
    effect(() => {
      const currentClass = this.colorClass() || 'primary';

      this.previousClass() && this.renderer.removeClass(this.element.nativeElement, this.previousClass()!);

      this.renderer.addClass(this.element.nativeElement, currentClass);
      this.previousClass.set(currentClass);
    });
  }
}