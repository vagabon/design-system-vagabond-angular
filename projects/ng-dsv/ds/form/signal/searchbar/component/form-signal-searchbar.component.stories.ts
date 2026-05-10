import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvFormSignalSearchbarComponent } from './form-signal-searchbar.component';

const meta: Meta<DsvFormSignalSearchbarComponent> = {
    title: 'dsv/Form/Signal/search',
    component: DsvFormSignalSearchbarComponent,
    excludeStories: /.*Data$/,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;
type Story = StoryObj<DsvFormSignalSearchbarComponent>;

export const Default: Story = {
    args: {
        search: '',
    },
};
