import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvAccordionComponent } from './accordion.component';

export const ActionsData = {
  open: false,
  title: 'vagabond',
  content:
    'primary<br/>text text text text text text text text text text text text <br/>fdfdsfsd',
};

const meta: Meta<DsvAccordionComponent> = {
  title: 'dsv/Accordion',
  component: DsvAccordionComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<DsvAccordionComponent>;

export const Default: Story = {
  args: {},
  render: (args: DsvAccordionComponent & { content?: string }) => ({
    template: `<dsv-accordion open="${args.open}" title="${args.title}"> ${args.content} </dsv-accordion>`,
  }),
};
