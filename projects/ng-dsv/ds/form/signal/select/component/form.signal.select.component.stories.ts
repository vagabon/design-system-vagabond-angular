import { Component, input, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { form } from '@angular/forms/signals';
import { type Meta, type StoryObj } from '@storybook/angular';
import { CustomFormGroup } from '../../../reactive/input/component/form.reactive.input.component.stories';
import { FormSignalSelectComponent } from './form.signal.select.component';

interface TestDto {
  role: string;
}

@Component({
  selector: 'story-signal-select',
  standalone: true,
  imports: [FormSignalSelectComponent],
  template: `
    @if (myForm) {
      <dsv-form-signal-select [form]="myForm" fieldName="role" [list]="list()" (onSend)="onSend($event)" />
    }
  `
})
class StorySignalSelect {
  value = input<string>("");
  list = input<{ id: number; name: string; }[]>([]);
  myForm = form<TestDto>(signal({ role: this.value() }), path => {
  });
  onSend = () => { };

}

const meta: Meta<StorySignalSelect> = {
  title: 'dsv/Form/Signal/select',
  component: StorySignalSelect,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<StorySignalSelect>;

const MY_FORM = new FormGroup({
  exampleField: new FormControl(''),
}) as unknown as CustomFormGroup;

MY_FORM['toJSON'] = () => null;

export const Default: Story = {
  args: {
    value: "1",
    list: [
      { id: -1, name: '' },
      { id: 1, name: 'USER' },
      { id: 2, name: 'MEMBER' },
      { id: 3, name: 'ADMIN' }
    ]
  },
};