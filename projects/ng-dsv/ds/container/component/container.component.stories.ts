import { StorageService } from '@ng-vagabond-lab/ng-dsv/storage';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DsvContainerComponent } from './container.component';

export const ActionsData = {
  content: 'content',
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
