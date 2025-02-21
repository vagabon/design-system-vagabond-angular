import { type Meta, type StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { DsvAccordionComponent } from './accordion.component';

export const ActionsData = {
  avatar: 'vagabond',
  color: 'primary',
};

const meta: Meta<DsvAccordionComponent> = {
  title: 'dsv/Accordion',
  component: DsvAccordionComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'error'],
    },
    callback: { action: 'callback' },
  },
  args: {
    ...(ActionsData as DsvAccordionComponent),
  },
};

export default meta;
type Story = StoryObj<DsvAccordionComponent>;

export const Default: Story = {
  args: {
    callback: undefined,
  },
};

export const WithCallback: Story = {
  args: {
    callback: fn(),
  },
};
