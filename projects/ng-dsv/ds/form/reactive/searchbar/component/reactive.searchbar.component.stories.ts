import { type Meta, type StoryObj } from '@storybook/angular';
import { ReactiveSearchbarComponent } from './reactive.searchbar.component';

const meta: Meta<ReactiveSearchbarComponent> = {
  title: 'dsv/Form/Reactive/search',
  component: ReactiveSearchbarComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<ReactiveSearchbarComponent>;

export const Default: Story = {
  args: {
    search: '',
  },
};