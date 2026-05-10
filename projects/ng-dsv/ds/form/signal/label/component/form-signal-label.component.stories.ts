import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvFormSignalLabelComponent } from './form-signal-label.component';

interface Test {
    title: string;
}

const meta: Meta<DsvFormSignalLabelComponent<Test>> = {
    title: 'dsv/Form/Signal/label',
    component: DsvFormSignalLabelComponent,
    excludeStories: /.*Data$/,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;
type Story = StoryObj<DsvFormSignalLabelComponent<Test>>;

export const Default: Story = {
    args: {
        label: 'test',
    },
};
