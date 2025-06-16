import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvAvatarComponent } from './avatar.component';

export const ActionsData = {
  avatar: 'vagabond',
  color: 'primary',
};

const meta: Meta<DsvAvatarComponent> = {
  title: 'dsv/Avatar',
  component: DsvAvatarComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'error'],
    },
    callback: { action: 'callback' },
  },
  args: {
    ...(ActionsData as any),
  },
};

export default meta;
type Story = StoryObj<DsvAvatarComponent>;

export const Default: Story = {
  args: {},
  render: (args: any) => ({
    template: `<dsv-avatar avatar="${args.avatar}" color="${args.color}">  </dsv-avatar>`,
  }),
};

export const WithCallback: Story = {
  args: {
    callback: () => {},
  },
};
