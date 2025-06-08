import { ColorType } from '@ng-vagabond-lab/ng-dsv/type';
import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvButtonComponent } from './button.component';

export const ActionsData: {
  libelle: string;
  color: ColorType;
  icon: string;
  iconEnd: string;
  fullwidth: boolean;
  noHover: boolean;
  show: boolean;
  disabled: boolean;
  callback: () => void;
} = {
  libelle: 'Click me',
  color: 'primary',
  icon: 'ri-spam-fill',
  iconEnd: '',
  fullwidth: false,
  noHover: false,
  show: true,
  disabled: false,
  callback: () => { },
};

export const buttonColors: ColorType[] = [
  'default',
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
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
    },
    width: { control: 'select', options: ['small', 'medium', 'large'] },
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
