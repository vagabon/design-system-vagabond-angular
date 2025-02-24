import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DsvHeaderComponent } from '../../header';
import { DsvItemComponent } from '../../item';
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
  decorators: [
    moduleMetadata({
      imports: [DsvHeaderComponent, DsvItemComponent],
    }),
  ],
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
    template: `<dsv-header img="https://ownyourchatbots.com/images/logo.png" title="dsqdsq"> 
      </dsv-header>
      <dsv-menu [showFooter]="${args.showFooter}"> 
        <dsv-item text="text"></dsv-item>
        <dsv-item text="text"></dsv-item>
        <dsv-item text="text"></dsv-item>
        <dsv-item text="text"></dsv-item>
      </dsv-menu>
    `,
  }),
};
