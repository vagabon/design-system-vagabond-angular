import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvMenuComponent } from './menu.component';

export const ActionsData = {
  showFooter: true,
  content: 'content',
};

const meta: Meta<DsvMenuComponent> = {
  title: 'dsv/Menu',
  component: DsvMenuComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<DsvMenuComponent>;

export const Default: Story = {
  args: {},
  render: (args: any) => ({
    template: `<dsv-menu showFooter="${args.showFooter}"> ${args.content} </dsv-menu>`,
  }),
};
