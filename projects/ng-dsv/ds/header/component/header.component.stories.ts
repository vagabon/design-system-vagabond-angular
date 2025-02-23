import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvHeaderComponent } from './header.component';

export const ActionsData = {
  img: 'https://ownyourchatbots.com/images/logo.png',
  title: 'My webapp',
  content: 'content',
};

const meta: Meta<DsvHeaderComponent> = {
  title: 'dsv/Header',
  component: DsvHeaderComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<DsvHeaderComponent>;

export const Default: Story = {
  args: {},
  render: (args: DsvHeaderComponent & { content?: string }) => ({
    template: `<dsv-header img="${args.img}" title="${args.title}"> ${args.content} </dsv-header>`,
  }),
};
