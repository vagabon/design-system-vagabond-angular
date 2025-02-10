import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { NgDsvComponent } from './ng-dsv.component';

export const ActionsData = {
  onArchiveTask: fn(),
  onPinTask: fn(),
};

const meta: Meta<NgDsvComponent> = {
  title: 'Task',
  component: NgDsvComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<NgDsvComponent>;

export const Default: Story = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX',
    },
  },
};
