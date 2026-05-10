import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvFormReactiveSearchbarComponent } from './form-reactive-searchbar.component';

const meta: Meta<DsvFormReactiveSearchbarComponent> = {
    title: 'dsv/Form/Reactive/search',
    component: DsvFormReactiveSearchbarComponent,
    excludeStories: /.*Data$/,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;
type Story = StoryObj<DsvFormReactiveSearchbarComponent>;

export const Default: Story = {
    args: {
        search: '',
    },
};
