import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvContainerComponent } from './container.component';

export const ActionsData = {
  content: 'content',
  column: false,
};

const meta: Meta<DsvContainerComponent> = {
  title: 'dsv/Container',
  component: DsvContainerComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<DsvContainerComponent>;

export const Default: Story = {
  args: {},
  render: (args: DsvContainerComponent & { content?: string }) => ({
    template: `<dsv-container > ${args.content} </dsv-container>`,
  }),
};
