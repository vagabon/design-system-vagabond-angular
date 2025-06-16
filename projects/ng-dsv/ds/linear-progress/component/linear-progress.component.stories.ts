import { type Meta, type StoryObj } from '@storybook/angular';
import { LinearProgressComponent } from './linear-progress.component';

export const ActionsData = {
  load: true,
};

const meta: Meta<LinearProgressComponent> = {
  title: 'dsv/Progress/linear',
  component: LinearProgressComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<LinearProgressComponent>;

export const Default: Story = {
  args: {},
};
