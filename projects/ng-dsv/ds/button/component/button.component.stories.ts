import { colorControls } from '@ng-vagabond-lab/ng-dsv/type';
import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvButtonComponent } from './button.component';

export const ActionsData = {
  libelle: 'Click me',
  width: 'small',
  variant: 'contained',
  color: 'primary',
  icon: 'ri-spam-fill',
  iconEnd: '',
  noHover: false,
  show: true,
  disabled: false,
  callback: () => { },
};

const meta: Meta<DsvButtonComponent> = {
  title: 'dsv/Button',
  component: DsvButtonComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
    ...colorControls as Meta<DsvButtonComponent>['argTypes'],
  },
  args: {
    ...ActionsData as Meta<DsvButtonComponent>['args'],
  },
};

export default meta;
type Story = StoryObj<DsvButtonComponent>;

export const Default: Story = {
  args: {
    libelle: 'Click me',
  },
};
