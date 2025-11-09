import { type Meta, type StoryObj } from '@storybook/angular';
import { SearchbarComponent } from './searchbar.component';

const meta: Meta<SearchbarComponent> = {
  title: 'dsv/Form/Legacy/search',
  component: SearchbarComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<SearchbarComponent>;

export const Default: Story = {
  args: {
    search: '',
  },
};