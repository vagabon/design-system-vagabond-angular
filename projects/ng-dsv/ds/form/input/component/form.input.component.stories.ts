import { FormControl, FormGroup } from '@angular/forms';
import { type Meta, type StoryObj } from '@storybook/angular';
import { FormInputComponent } from '../../public-api';

const meta: Meta<FormInputComponent> = {
  title: 'dsv/Form/input',
  component: FormInputComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        "text", "password", "email", "number", "date", "time", "datetime-local",
        "month", "week", "url", "search", "tel", "color", "range", "checkbox",
        "radio", "file", "submit", "reset", "button", "image", "hidden"
      ],
    },
    onSend: { action: 'onSend' },
  },
};

export default meta;
type Story = StoryObj<FormInputComponent>;

const MY_FORM: any = new FormGroup({
  exampleField: new FormControl(''),
})

// Tell JSON.stringify to serialize it as null > No circular dependency
MY_FORM['toJSON'] = () => null;

export const Default: Story = {
  args: {
    form: MY_FORM,
    field: 'exampleField',
    type: 'text',
  },
};