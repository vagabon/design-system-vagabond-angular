import { FormControl, FormGroup } from '@angular/forms';
import { type Meta, type StoryObj } from '@storybook/angular';
import { FormReactiveInputComponent } from '../../public-api';

const meta: Meta<FormReactiveInputComponent> = {
  title: 'dsv/Form/Reactive/input',
  component: FormReactiveInputComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        "text", "password", "textarea", "email", "number", "date", "time", "datetime-local",
        "month", "week", "url", "search", "tel", "color", "range", "file", "hidden"
      ],
    },
    onSend: { action: 'onSend' },
  },
};

export default meta;
type Story = StoryObj<FormReactiveInputComponent>;

export interface CustomFormGroup extends FormGroup {
  toJSON: () => null;
}

const MY_FORM = new FormGroup({
  exampleField: new FormControl(''),
}) as unknown as CustomFormGroup;

MY_FORM['toJSON'] = () => null;

export const Default: Story = {
  args: {
    form: MY_FORM,
    field: 'exampleField',
    type: 'text',
  },
};