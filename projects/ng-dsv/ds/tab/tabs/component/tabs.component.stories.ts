import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvTabsComponent } from './tabs.component';

export const ActionsData = {
    tabs: [
        { id: 'home', title: 'Accueil', url: '/tab1' },
        { id: 'settings', title: 'Paramètres', url: '/tab2' },
    ],
    active: 'home',
};

const meta: Meta<DsvTabsComponent> = {
    title: 'dsv/Tabs',
    component: DsvTabsComponent,
    excludeStories: /.*Data$/,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;
type Story = StoryObj<DsvTabsComponent>;

export const Default: Story = {
    args: {
        ...ActionsData,
    },
};
