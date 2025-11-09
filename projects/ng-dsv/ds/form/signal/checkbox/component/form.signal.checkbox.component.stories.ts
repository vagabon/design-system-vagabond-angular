import { FormControl, FormGroup } from '@angular/forms';
import { type Meta, type StoryObj } from '@storybook/angular';
import { CustomFormGroup } from '../../../legacy/input/component/form.input.component.stories';
import { FormSignalCheckboxComponent } from './form.signal.checkbox.component';

interface TestDto {
  myCheckbox: boolean;
}

const meta: Meta<FormSignalCheckboxComponent<TestDto>> = {
  title: 'dsv/Form/Signal/checkbox',
  component: FormSignalCheckboxComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<FormSignalCheckboxComponent<TestDto>>;

const MY_FORM = new FormGroup({
  exampleField: new FormControl(''),
}) as unknown as CustomFormGroup;

MY_FORM['toJSON'] = () => null;

export const Default: Story = {
  args: {
  },
};