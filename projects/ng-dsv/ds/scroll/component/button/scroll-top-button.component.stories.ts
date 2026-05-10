import { type Meta, type StoryObj } from '@storybook/angular';
import { ButtonScrollTopComponent } from './scroll-top-button.component';

export const ActionsData: {
    scroll: number;
} = {
    scroll: 500,
};

const meta: Meta<ButtonScrollTopComponent> = {
    title: 'dsv/Button/scrollTop',
    component: ButtonScrollTopComponent,
    excludeStories: /.*Data$/,
    tags: ['autodocs'],
    argTypes: {},
    args: {
        ...ActionsData,
    },
};

export default meta;
type Story = StoryObj<ButtonScrollTopComponent>;

export const Default: Story = {
    args: {},
};
