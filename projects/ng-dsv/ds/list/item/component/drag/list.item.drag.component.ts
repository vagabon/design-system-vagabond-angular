import { Component, inject, input } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { ButtonVariantType } from '@ng-vagabond-lab/ng-dsv/type';
import { ListDragService } from '../../../public-api';

@Component({
    selector: 'dsv-list-item-drag',
    imports: [DsvButtonComponent],
    templateUrl: './list.item.drag.component.html',
    styleUrl: './list.item.drag.component.scss',
})
export class ListItemDragComponent {
    readonly listDragService = inject(ListDragService);

    variant = input<ButtonVariantType>('text');

    onHandleMouseDown(event: MouseEvent) {
        const li = (event.currentTarget as HTMLElement).closest('li') as HTMLElement;
        if (li) {
            li.draggable = true;
        }
    }

    onTouchStart(event: TouchEvent) {
        this.listDragService.touchDragging.set(true);
    }
}
