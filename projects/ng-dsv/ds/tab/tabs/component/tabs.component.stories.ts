import { type Meta, type StoryObj } from '@storybook/angular';
import { TabsComponent } from './tabs.component';

export const ActionsData = {
  tabs: [
    { id: 'home', title: 'Accueil', url: '/tab1' },
    { id: 'settings', title: 'Paramètres', url: '/tab2' }
  ],
  active: 'home'
};

const meta: Meta<TabsComponent> = {
  title: 'dsv/Tabs',
  component: TabsComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<TabsComponent>;

export const Default: Story = {
  args: {
    ...ActionsData,
  },
};
