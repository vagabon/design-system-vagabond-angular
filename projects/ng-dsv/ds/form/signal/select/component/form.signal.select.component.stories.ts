import { FormControl, FormGroup } from '@angular/forms';
import { type Meta, type StoryObj } from '@storybook/angular';
import { CustomFormGroup } from '../../../legacy/input/component/form.input.component.stories';
import { FormSignalSelectComponent } from './form.signal.select.component';

interface TestDto {
  role: string;
}

const meta: Meta<FormSignalSelectComponent<TestDto>> = {
  title: 'dsv/Form/Signal/select',
  component: FormSignalSelectComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<FormSignalSelectComponent<TestDto>>;

const MY_FORM = new FormGroup({
  exampleField: new FormControl(''),
}) as unknown as CustomFormGroup;

MY_FORM['toJSON'] = () => null;

export const Default: Story = {
  args: {
    list: [
      { id: 1, name: 'name' },
      { id: 2, name: 'name 2' }
    ]
  },
};