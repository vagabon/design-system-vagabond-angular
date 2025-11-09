import { Component, input, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Field, form } from '@angular/forms/signals';
import { type Meta, type StoryObj } from '@storybook/angular';
import { CustomFormGroup } from '../../../reactive/input/component/form.reactive.input.component.stories';
import { FormSignalCheckboxComponent } from './form.signal.checkbox.component';

interface TestDto {
  myCheckbox: boolean;
}

@Component({
  selector: 'story-signal-checkbox',
  standalone: true,
  imports: [FormSignalCheckboxComponent, Field],
  template: `
    @if (myForm) {
      <dsv-form-signal-checkbox [form]="myForm" fieldName="myCheckbox" (onSend)="onSend($event)" />
    }
  `
})
class StorySignalChecbox {
  value = input<boolean>(false);
  myForm = form<TestDto>(signal({ myCheckbox: this.value() }), path => {
  });
  onSend = () => { };

}

const meta: Meta<StorySignalChecbox> = {
  title: 'dsv/Form/Signal/checkbox',
  component: StorySignalChecbox,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<StorySignalChecbox>;

const MY_FORM = new FormGroup({
  exampleField: new FormControl(''),
}) as unknown as CustomFormGroup;

MY_FORM['toJSON'] = () => null;

export const Default: Story = {
  args: {
    value: true
  },
  parameters: {
    docs: {
      source: {
        code: `
          <dsv-form-signal-checkbox [form]="myForm" fieldName="myCheckbox" (onSend)="onSend($event)" />
        `,
      },
    },
  },
};