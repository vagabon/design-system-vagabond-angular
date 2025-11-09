import { FormControl, FormGroup } from '@angular/forms';
import { type Meta, type StoryObj } from '@storybook/angular';
import { CustomFormGroup } from '../../input/component/form.reactive.input.component.stories';
import { FormReactiveCheckboxComponent } from './form.reactive.checkbox.component';

const meta: Meta<FormReactiveCheckboxComponent> = {
  title: 'dsv/Form/Reactive/checkbox',
  component: FormReactiveCheckboxComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<FormReactiveCheckboxComponent>;

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