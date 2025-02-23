import { ColorType } from '@ng-vagabond-lab/ng-dsv/type';
import { type Meta, type StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { DsvButtonComponent } from './button.component';

export const ActionsData: {
  libelle: string;
  color: ColorType;
  icon: string;
  iconEnd: string;
  fullwidth: boolean;
  show: boolean;
  disabled: boolean;
  callback: () => void;
} = {
  libelle: 'Click me',
  color: 'primary',
  icon: 'ri-spam-fill',
  iconEnd: '',
  fullwidth: false,
  show: true,
  disabled: false,
  callback: fn(),
};

export const buttonColors: ColorType[] = [
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
