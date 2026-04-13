import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ListDragService {
    dragSrcIndex = signal<number | null>(null);
    touchDragging = signal<boolean>(false);
}