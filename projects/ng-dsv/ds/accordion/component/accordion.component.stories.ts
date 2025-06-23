import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvAccordionComponent } from './accordion.component';

const ActionsData = {
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
  render: (args: any) => ({
    template: `<dsv-accordion [open]="${args.open}" titleText="${args.title}"> ${args.content} </dsv-accordion>`,
  }),
};

export const Second: Story = {
  args: {},
  render: (args: any) => ({
    template: `<dsv-accordion [open]="true" titleText="${args.title}"> ${args.content} </dsv-accordion>`,
  }),
};
