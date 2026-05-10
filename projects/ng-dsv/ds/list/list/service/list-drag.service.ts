import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ListDragService {
    readonly dragSrcIndex = signal<number | null>(null);
    readonly touchDragging = signal<boolean>(false);
}
