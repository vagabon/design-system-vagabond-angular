import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvPaginateComponent } from './paginate.component';

export const ActionsData = {
    page: 0,
    max: 10,
    callback: () => {},
};

const meta: Meta<DsvPaginateComponent> = {
    title: 'dsv/Paginate',
    component: DsvPaginateComponent,
    excludeStories: /.*Data$/,
    tags: ['autodocs'],
    argTypes: {},
    args: {
        ...ActionsData,
    },
};

export default meta;
type Story = StoryObj<DsvPaginateComponent>;

export const Default: Story = {
    args: {},
};
