import { computed, Directive, input, output, signal } from '@angular/core';

@Directive({
    selector: '[appDragDrop]',
    host: {
        '[class.dragging]': 'dragInProgress()',
        '(dragenter)': 'onDragOver($event)',
        '(dragover)': 'onDragOver($event)',
        '(dragleave)': 'onDragEnd($event)',
        '(dragend)': 'onDragEnd($event)',
        '(drop)': 'onDrop($event)',
    },
})
export class FileUploadDirective {
    readonly appDragDrop = input<any>();

    readonly dropped = output<DragEvent>();

    readonly dragInProgress = signal(false);

    private readonly enabled = computed<boolean>(() => {
        const value = this.appDragDrop();
        return value === '' ? true : !!value;
    });

    onDragOver(event: DragEvent): void {
        if (!this.enabled()) return;
        this.stopAndPreventDefault(event);
        this.dragInProgress.set(true);
    }

    onDragEnd(event: DragEvent): void {
        if (!this.enabled()) return;
        this.stopAndPreventDefault(event);
        this.dragInProgress.set(false);
    }

    onDrop(event: DragEvent): void {
        this.stopAndPreventDefault(event);
        this.dragInProgress.set(false);
        this.dropped.emit(event);
    }

    private stopAndPreventDefault(e: UIEvent): void {
        e.stopPropagation();
        e.preventDefault();
    }
}
