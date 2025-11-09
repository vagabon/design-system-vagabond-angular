import { type Meta, type StoryObj } from '@storybook/angular';
import { FormReactiveLabelComponent } from './form.reactive.label.component';

const meta: Meta<FormReactiveLabelComponent> = {
  title: 'dsv/Form/Reactive/label',
  component: FormReactiveLabelComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<FormReactiveLabelComponent>;

export const Default: Story = {
  args: {
    label: 'test',
  },
};