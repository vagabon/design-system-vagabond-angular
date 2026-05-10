import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DsvFileUploadComponent } from './file-upload.component';

export const ActionsData = {};

const meta: Meta<DsvFileUploadComponent> = {
    title: 'dsv/File/upload',
    component: DsvFileUploadComponent,
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
type Story = StoryObj<DsvFileUploadComponent>;

export const Default: Story = {
    args: {},
    render: (args: any) => ({
        template: `<dsv-file-upload> 
                <img src="/assets/images/ic-upload-file.svg" alt="" />
                <div>Drop your image here</div>
              </dsv-file-upload>`,
    }),
};
