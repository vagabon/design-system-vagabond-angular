import { type Meta, type StoryObj } from '@storybook/angular';
import { FormSignalLabelComponent } from './form.signal.label.component';

interface Test {
  title: string;
}

const meta: Meta<FormSignalLabelComponent<Test>> = {
  title: 'dsv/Form/Signal/label',
  component: FormSignalLabelComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<FormSignalLabelComponent<Test>>;

export const Default: Story = {
  args: {
    label: 'test',
  },
};