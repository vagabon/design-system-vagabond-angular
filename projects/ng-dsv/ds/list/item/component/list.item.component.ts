import { Component, ElementRef, inject, input, output, viewChild } from "@angular/core";
import { ListItemDragDto } from "../../list/dto/list.dto";
import { ListDragService } from "../../list/service/list.drag.service";

@Component({
    selector: 'dsv-list-item',
    standalone: true,
    imports: [],
    templateUrl: './list.item.component.html',
    styleUrl: './list.item.component.scss',
})
export class ListItemComponent {
    readonly listDragService = inject(ListDragService);

    index = input.required<number>();

    callbackOrder = output<ListItemDragDto>();

    readonly liRef = viewChild<ElementRef>('liRef');
    ghostEl: HTMLElement | null = null;

    constructor() {
    }

    onHandleMouseDown(event: MouseEvent) {
        const div = (event.currentTarget as HTMLElement).closest('div') as HTMLElement;
        if (div) div.draggable = true;
    }

    onDragStart(index: number, event: DragEvent) {
        this.listDragService.dragSrcIndex.set(index);
        event.dataTransfer!.effectAllowed = 'move';
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        event.dataTransfer!.dropEffect = 'move';
    }

    onDrop(targetIndex: number, event: DragEvent) {
        event.preventDefault();
        const dragSrcIndex = this.listDragService.dragSrcIndex();
        if (dragSrcIndex === null || dragSrcIndex === targetIndex) {
            return;
        }
        this.callbackOrder.emit({ dragSrcIndex: dragSrcIndex, targetIndex: targetIndex });
        this.listDragService.dragSrcIndex.set(null);
    }

    onDragEnd() {
        this.listDragService.dragSrcIndex.set(null);
    }

    onTouchStart(event: TouchEvent) {
        if (!this.listDragService.touchDragging()) {
            return;
        }
        this.listDragService.dragSrcIndex.set(this.index());

        const li = this.liRef()?.nativeElement as HTMLElement;
        if (!li) {
            return;
        }

        const rect = li.getBoundingClientRect();
        const touch = event.touches[0];

        this.ghostEl = li.cloneNode(true) as HTMLElement;
        this.ghostEl.classList.add('ghost-drag');
        this.ghostEl.style.top = `${touch.clientY - rect.height / 2}px`;
        this.ghostEl.style.left = `${rect.left}px`;
        this.ghostEl.style.width = `${rect.width - 25}px`;
        this.ghostEl.style.height = `${rect.height - 25}px`;

        const ul = li.closest('ul');
        if (ul) {
            ul.appendChild(this.ghostEl);
        }
        this.ghostEl.style.opacity = '0.5';
    }

    onTouchMove(event: TouchEvent) {
        event.preventDefault();
        const touch = event.touches[0];

        if (this.ghostEl) {
            const rect = (this.liRef()?.nativeElement as HTMLElement).getBoundingClientRect();
            this.ghostEl.style.top = `${touch.clientY - rect.height / 2}px`;
            this.ghostEl.style.left = `${rect.left}px`;
        }

        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        const targetLi = target?.closest('li');

        document.querySelectorAll('li.drag-over-touch')
            .forEach(el => el.classList.remove('drag-over-touch'));

        if (targetLi && targetLi !== this.liRef()?.nativeElement) {
            targetLi.classList.add('drag-over-touch');
        }
    }

    onTouchEnd(event: TouchEvent) {
        if (this.ghostEl) {
            this.ghostEl.remove();
            this.ghostEl = null;
        }

        const li = this.liRef()?.nativeElement as HTMLElement;
        if (li) li.style.opacity = '1';

        const touch = event.changedTouches[0];
        const target = document.elementFromPoint(touch?.clientX, touch?.clientY);
        const targetLi = target?.closest('[data-index]') as HTMLElement | null;

        if (targetLi) {
            const targetIndex = parseInt(targetLi.dataset['index'] ?? '-1');
            const dragSrcIndex = this.listDragService.dragSrcIndex();
            if (dragSrcIndex !== null && dragSrcIndex !== targetIndex && targetIndex >= 0) {
                this.callbackOrder.emit({ dragSrcIndex, targetIndex });
            }
        }

        document.querySelectorAll('li.drag-over-touch')
            .forEach(el => el.classList.remove('drag-over-touch'));
        this.listDragService.dragSrcIndex.set(null);
        this.listDragService.touchDragging.set(false);
    }
}