import { type Meta, type StoryObj } from '@storybook/angular';
import { FormSignalSearchbarComponent } from './form.signal.searchbar.component';

const meta: Meta<FormSignalSearchbarComponent> = {
  title: 'dsv/Form/Signal/search',
  component: FormSignalSearchbarComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<FormSignalSearchbarComponent>;

export const Default: Story = {
  args: {
    search: '',
  },
};