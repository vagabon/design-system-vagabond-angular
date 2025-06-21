import { type Meta, type StoryObj } from '@storybook/angular';
import { PaginateComponent } from './paginate.component';

export const ActionsData = {
  page: 0,
  max: 10,
  callback: () => { }
};

const meta: Meta<PaginateComponent> = {
  title: 'dsv/Paginate',
  component: PaginateComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<PaginateComponent>;

export const Default: Story = {
  args: {},
};
