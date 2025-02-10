import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvButtonComponent } from './button.component';

export const ActionsData = {
  libelle: '',
  color: 'primary',
  icon: 'ri-spam-fill',
  iconEnd: '',
  fullwidth: false,
  show: true,
  disabled: false,
};

const meta: Meta<DsvButtonComponent> = {
  title: 'dsv/Button',
  component: DsvButtonComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['premium', 'success', 'info', 'warning', 'error'],
    },
    width: { control: 'select', options: ['small', 'medium', 'large', 'full'] },
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
    },
  },
  args: {
    ...ActionsData,
    width: 'medium',
    variant: 'contained',
  },
};

export default meta;
type Story = StoryObj<DsvButtonComponent>;

export const Default: Story = {
  args: {
    libelle: 'Click me',
  },
};
