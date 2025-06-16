import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FileUploadComponent } from './file-upload.component';

export const ActionsData = {
};

const meta: Meta<FileUploadComponent> = {
  title: 'dsv/File/upload',
  component: FileUploadComponent,
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
type Story = StoryObj<FileUploadComponent>;

export const Default: Story = {
  args: {},
  render: (args: any) => ({
    template: `<dsv-file-upload> 
                <img src="/assets/images/ic-upload-file.svg" alt="" />
                <div>Drop your image here</div>
              </dsv-file-upload>`,
  }),
};
