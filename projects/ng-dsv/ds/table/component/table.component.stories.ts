import { type Meta, type StoryObj } from '@storybook/angular';
import { TableComponent } from './table.component';

export const ActionsData = {
  url: '/',
  cells: [
    { name: 'username', label: 'Username' },
    { name: 'createdAt', label: 'createdAt', date: true }
  ],
  datas: [
    { id: 1, username: 'Alice', createdAt: '2025-06-07T22:13:05.920427' },
    { id: 2, username: 'Bob', createdAt: '2025-06-08T08:45:00.123456' }
  ],
  max: 10
};

const meta: Meta<TableComponent> = {
  title: 'dsv/Table',
  component: TableComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<TableComponent>;

export const Default: Story = {
  args: {},
};
