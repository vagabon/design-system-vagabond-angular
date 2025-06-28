import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { type Meta, type StoryObj } from '@storybook/angular';
import { MenuContextualDto } from '../../dto/menu.contextual';
import { DsvMenuContextualComponent } from './menu.contextual.component';

const options: MenuContextualDto[] = [
  { id: 'home', icon: 'ri-home-2-line', text: 'Option 1' },
  { id: 'settings', icon: 'ri-tools-line', text: 'Option 2' },
  { id: 'Déconnexion', icon: 'ri-logout-box-line', color: 'error', text: 'Déconnexion' },
  { id: 'tululu', text: 'Option 4', divider: true }
]

export const ActionsData = {
  options
};

const meta: Meta<DsvMenuContextualComponent> = {
  title: 'dsv/Menu/contextual',
  component: DsvMenuContextualComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: {
        type: 'object',
      },
    },
  },
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<DsvMenuContextualComponent>;

export const Default: Story = {
  render: (args: any) => ({
    moduleMetadata: {
      imports: [DsvButtonComponent],
    },
    props: args,
    template: `
      <div style="display: flex; gap: 10px; margin: 0px 0px; height: 200px;">
        <dsv-menu-contextual buttonClick='left' [options]="options">
          <dsv-button [prevent]="false">Clique Gauche</dsv-button>
        </dsv-menu-contextual>
        <dsv-menu-contextual buttonClick='right' [options]="options">
          <dsv-button [prevent]="false">Clique Droit</dsv-button>
        </dsv-menu-contextual>
      </div>
    `,
  }),
};
