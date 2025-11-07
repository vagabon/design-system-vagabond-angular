import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[appDragDrop]'
})
export class FileUploadDirective {

    private _enabled: boolean = false;
    private _dragInProgress: boolean = false;

    @Input() set appDragDrop(value: any) {
        this._enabled = value === '' ? true : !!value;
    }


    @HostBinding('class.dragging') get dragInProgress() {
        return this._dragInProgress;
    }

    @Output() dropped: EventEmitter<any>;

    constructor() {
        this.dropped = new EventEmitter();
    }

    @HostListener('dragenter', ['$event'])
    @HostListener('dragover', ['$event'])
    handleDragOver(event: DragEvent): void {
        if (!this._enabled) {
            return;
        }
        this.stopAndPreventDefault(event);
        this._dragInProgress = true;
    }

    @HostListener('dragleave', ['$event'])
    @HostListener('dragend', ['$event'])
    handleDragEnd(event: DragEvent): void {
        if (!this._enabled) {
            return;
        }
        this.stopAndPreventDefault(event);
        this._dragInProgress = false;
    }

    @HostListener('drop', ['$event'])
    handleDrop(event: UIEvent): void {
        this.stopAndPreventDefault(event);
        this._dragInProgress = false;
        this.dropped.emit(event);
    }

    stopAndPreventDefault(e: UIEvent): void {
        e.stopPropagation();
        e.preventDefault();
    }

}
