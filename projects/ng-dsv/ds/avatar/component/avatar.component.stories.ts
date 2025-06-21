import { colorControls } from '@ng-vagabond-lab/ng-dsv/type';
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
    ...colorControls as Meta<DsvAvatarComponent>['argTypes'],
    callback: { action: 'callback' },
  },
  args: {
    ...(ActionsData as any),
  },
};

export default meta;
type Story = StoryObj<DsvAvatarComponent>;

export const Default: Story = {
  render: (args: any) => ({
    template: `<dsv-avatar avatar="${args.avatar}" color="${args.color}" variant="${args.variant}" width="${args.width}" show="${args.show}" show="${args.show}"></dsv-avatar>`,
  }),
};

export const WithCallback: Story = {
  args: {
    callback: () => { },
  },
};
