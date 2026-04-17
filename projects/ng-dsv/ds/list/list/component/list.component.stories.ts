import { Component } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ListItemComponent, ListItemDragComponent } from '../../public-api';
import { ListItemDragDto } from '../dto/list.dto';
import { ListComponent } from './list.component';

export const ActionsData = {};

@Component({
    selector: 'app-list-wrapper',
    standalone: true,
    imports: [ListComponent, ListItemComponent, ListItemDragComponent],
    template: `
        <dsv-list>
            @for (element of elements; track element; let index = $index) {
                <dsv-list-item
                    [index]="index"
                    (callbackOrder)="onDrop($event)"
                >
                    <dsv-list-item-drag />
                    {{ element }}
                </dsv-list-item>
            }
        </dsv-list>
    `,
    styles: [
        `
            :host {
                width: 100%;
            }
        `,
    ],
})
class ListWrapperComponent {
    elements: string[] = ['Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5'];

    onDrop(itemDrag: ListItemDragDto) {
        const list = [...this.elements];
        const moved = list[itemDrag.dragSrcIndex];
        const filtered = list.filter((_, i) => i !== itemDrag.dragSrcIndex);
        filtered.splice(itemDrag.targetIndex, 0, moved);
        this.elements = filtered;
    }
}

const meta: Meta<ListWrapperComponent> = {
    title: 'dsv/List',
    component: ListWrapperComponent,
    excludeStories: /.*Data$/,
    tags: ['autodocs'],
    decorators: [moduleMetadata({})],
    argTypes: {},
    args: {
        ...ActionsData,
    },
};

export default meta;
type Story = StoryObj<ListWrapperComponent>;

export const Default: Story = {
    args: {},
    parameters: {
        docs: {
            source: {
                code: `
        `,
            },
        },
    },
};
