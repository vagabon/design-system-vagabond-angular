import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DsvContainerComponent } from './container.component';

export const ActionsData = {
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  column: false,
};

const meta: Meta<DsvContainerComponent> = {
  title: 'dsv/Container',
  component: DsvContainerComponent,
  decorators: [
    moduleMetadata({
      providers: [StorageService],
    }),
  ],
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
  render: (args: any) => ({
    template: `<dsv-container > ${args.content} </dsv-container>`,
  }),
};
