import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvItemComponent } from './item.component';

export const ActionsData: {
  text: string;
  small: boolean;
  callback: () => void;
} = {
  text: 'My webapp',
  small: true,
  callback: () => { },
};

const meta: Meta<DsvItemComponent> = {
  title: 'dsv/Item',
  component: DsvItemComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<DsvItemComponent>;

export const Default: Story = {
  args: {},
};
