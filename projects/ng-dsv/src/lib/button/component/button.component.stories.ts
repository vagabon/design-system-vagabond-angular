import { type Meta, type StoryObj } from '@storybook/angular';
import { ButtonColorType, DsvButtonComponent } from './button.component';

export const ActionsData = {
  libelle: '',
  color: 'primary',
  icon: 'ri-spam-fill',
  iconEnd: '',
  fullwidth: false,
  show: true,
  disabled: false,
};

export const buttonColors: ButtonColorType[] = [
  'primary',
  'success',
  'info',
  'warning',
  'error',
];

const meta: Meta<DsvButtonComponent> = {
  title: 'dsv/Button',
  component: DsvButtonComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: buttonColors,
    },
    width: { control: 'select', options: ['small', 'medium', 'large'] },
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
    },
  },
  args: {
    ...(ActionsData as DsvButtonComponent),
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
