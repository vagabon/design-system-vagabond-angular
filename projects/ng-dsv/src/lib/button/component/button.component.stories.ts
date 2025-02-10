import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvButtonComponent } from './button.component';

export const ActionsData = {
  libelle: '',
};

const meta: Meta<DsvButtonComponent> = {
  title: 'dsv/Button',
  component: DsvButtonComponent,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,

  tags: ['autodocs'],
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<DsvButtonComponent>;

export const Default: Story = {
  args: {
    libelle: 'Click me',
  },
};
