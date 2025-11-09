import { FormControl, FormGroup } from '@angular/forms';
import { type Meta, type StoryObj } from '@storybook/angular';
import { CustomFormGroup } from '../../input/component/form.reactive.input.component.stories';
import { FormReactiveSelectComponent } from './form.reactive.select.component';

const meta: Meta<FormReactiveSelectComponent> = {
  title: 'dsv/Form/Reactive/select',
  component: FormReactiveSelectComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<FormReactiveSelectComponent>;

const MY_FORM = new FormGroup({
  exampleField: new FormControl(''),
}) as unknown as CustomFormGroup;

MY_FORM['toJSON'] = () => null;

export const Default: Story = {
  args: {
    form: MY_FORM,
    field: 'exampleField',
    list: [
      { id: 1, name: 'name' },
      { id: 2, name: 'name 2' }
    ]
  },
};