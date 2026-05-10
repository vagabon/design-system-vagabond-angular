import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvFormReactiveLabelComponent } from './form-reactive-label.component';

const meta: Meta<DsvFormReactiveLabelComponent> = {
    title: 'dsv/Form/Reactive/label',
    component: DsvFormReactiveLabelComponent,
    excludeStories: /.*Data$/,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;
type Story = StoryObj<DsvFormReactiveLabelComponent>;

export const Default: Story = {
    args: {
        label: 'test',
    },
};
