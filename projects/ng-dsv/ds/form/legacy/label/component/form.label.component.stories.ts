import { type Meta, type StoryObj } from '@storybook/angular';
import { FormLabelComponent } from './form.label.component';

const meta: Meta<FormLabelComponent> = {
  title: 'dsv/Form/label',
  component: FormLabelComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<FormLabelComponent>;

export const Default: Story = {
  args: {
    label: 'test',
  },
};