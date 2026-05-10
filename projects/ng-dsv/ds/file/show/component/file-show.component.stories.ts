import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DsvFileShowComponent } from './file-show.component';

export const ActionsData = {
    url: 'https://api-blog.vagabond.synology.me',
    src: '/news/1/quarkus_react.png',
};

const meta: Meta<DsvFileShowComponent> = {
    title: 'dsv/File/show',
    component: DsvFileShowComponent,
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
type Story = StoryObj<DsvFileShowComponent>;

export const Default: Story = {
    args: {},
};
