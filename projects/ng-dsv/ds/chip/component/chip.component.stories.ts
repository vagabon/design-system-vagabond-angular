import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { DsvChipComponent } from './chip.component';

export const ActionsData = {
  text: 'text',
};

const meta: Meta<DsvChipComponent> = {
  title: 'dsv/Chip',
  component: DsvChipComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
    delete: { action: 'function', control: false },
  },
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<DsvChipComponent>;

export const Default: Story = {
  args: {},
  render: (args: any) => ({
    template: `<dsv-chip text="${args.text}"></dsv-chip>`,
  }),
};

export const WithDelete: Story = {
  args: {
    delete: fn(),
  },

};
