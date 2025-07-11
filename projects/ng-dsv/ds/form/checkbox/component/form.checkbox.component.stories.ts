import { FormControl, FormGroup } from '@angular/forms';
import { type Meta, type StoryObj } from '@storybook/angular';
import { CustomFormGroup } from '../../input/component/form.input.component.stories';
import { FormCheckboxComponent } from './form.checkbox.component';

const meta: Meta<FormCheckboxComponent> = {
  title: 'dsv/Form/checkbox',
  component: FormCheckboxComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<FormCheckboxComponent>;

const MY_FORM = new FormGroup({
  exampleField: new FormControl(''),
}) as unknown as CustomFormGroup;

MY_FORM['toJSON'] = () => null;

export const Default: Story = {
  args: {
    form: MY_FORM,
    field: 'exampleField',
  },
};