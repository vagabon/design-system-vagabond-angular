import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FileShowComponent } from './file.show.component';

export const ActionsData = {
  url: 'https://api-blog.vagabond.synology.me',
  src: '/news/1/quarkus_react.png',
};

const meta: Meta<FileShowComponent> = {
  title: 'dsv/File/download',
  component: FileShowComponent,
  decorators: [
    moduleMetadata({
      providers: [],
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
type Story = StoryObj<FileShowComponent>;

export const Default: Story = {
  args: {},
};
