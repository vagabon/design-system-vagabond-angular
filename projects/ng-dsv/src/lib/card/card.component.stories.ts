import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { DsvCardComponent } from './card.component';

export const ActionsData = {
  onArchiveTask: fn(),
  onPinTask: fn(),
};

const meta: Meta<DsvCardComponent> = {
  title: 'dsv/Card',
  component: DsvCardComponent,
  tags: ['autodocs'],
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<DsvCardComponent>;

export const Default: Story = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX',
    },
  },
};
