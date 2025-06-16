import { type Meta, type StoryObj } from '@storybook/angular';
import { ButtonScrollTopComponent } from './button.scroll-top.component';

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
