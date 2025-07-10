import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JSONValue } from '@ng-vagabond-lab/ng-dsv/api';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormCheckboxComponent, FormInputComponent, FormSelectComponent } from '../../public-api';
import { FormComponent } from './form.component';

export const ActionsData = {
  urlBack: '/',
};

@Component({
  selector: 'storybook-wrapper',
  standalone: true,
  imports: [FormComponent, FormInputComponent, FormCheckboxComponent, FormSelectComponent, ReactiveFormsModule],
  template: `
    <app-form [form]="form" urlBack="urlBack" (callback)="callback($event)">
      <dsv-form-input [form]="form" field="name" />
      <dsv-form-input [form]="form" type="number" field="number" />
      <dsv-form-input [form]="form" type="range" field="range" />
      <dsv-form-input [form]="form" type="datetime-local" field="date" />
      <dsv-form-input [form]="form" type="textarea" field="textarea" />
      <dsv-form-select [form]="form" field="select" [list]="[{id: '', name: ''}, {id: '1', name: 'Test'}]" />
      <dsv-form-checkbox [form]="form" field="checkbox" />
    </app-form>
  `,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ]
})
class StoryWrapperComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    number: new FormControl(''),
    range: new FormControl(50),
    date: new FormControl(''),
    textarea: new FormControl('', [Validators.required]),
    select: new FormControl('', [Validators.required]),
    checkbox: new FormControl(false),
  });

  urlBack?: string;
  callback = (data: JSONValue) => {
    console.log(data);
    alert('Callback appelé 🎉');
  }
}

const meta: Meta<StoryWrapperComponent> = {
  title: 'dsv/Form',
  component: StoryWrapperComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: ['form'] },
  },
  decorators: [
    moduleMetadata({
    }),
  ],
  argTypes: {},
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<StoryWrapperComponent>;

export const Default: Story = {
  args: {
    urlBack: '/dashboard',
  },
  parameters: {
    docs: {
      source: {
        code: `
          <app-form [form]="form" [urlBack]="urlBack" (callback)="callback()">
            <dsv-form-input [form]="form" field="name" />
            <dsv-form-input [form]="form" type="number" field="number" />
            <dsv-form-input [form]="form" type="range" field="range" />
            <dsv-form-input [form]="form" type="datetime-locale" field="date" />
            <dsv-form-input [form]="form" type="textarea" field="textarea" />
            <dsv-form-select [form]="form" field="select" [list]="[{id: '', name: ''}, {id: '1', name: 'Test'}]" />
            <dsv-form-checkbox [form]="form" field="checkbox" />
          </app-form>
        `,
      },
    },
  },
};