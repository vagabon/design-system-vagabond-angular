import { Component, signal } from '@angular/core';
import { email, form, maxLength, minLength, pattern, required } from '@angular/forms/signals';
import { JSONValue } from '@ng-vagabond-lab/ng-dsv/api';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormSignalCheckboxComponent } from '../../checkbox/component/form.signal.checkbox.component';
import { FormSignalInputComponent } from '../../public-api';
import { FormSignalSelectComponent } from '../../select/component/form.signal.select.component';
import { FormSignalComponent } from './form.signal.component';

export const ActionsData = {
  urlBack: '/',
};

@Component({
  selector: 'storybook-wrapper',
  standalone: true,
  imports: [FormSignalComponent, FormSignalInputComponent, FormSignalSelectComponent, FormSignalCheckboxComponent],
  template: `
    <app-form-signal [form]="myForm" urlBack="urlBack" (callback)="callback($event)">
      <dsv-form-signal-input [form]="myForm" fieldName="name" />
      <dsv-form-signal-input [form]="myForm" type="email" fieldName="email" />
      <dsv-form-signal-input [form]="myForm" type="number" fieldName="number" />
      <dsv-form-signal-input [form]="myForm" type="range" fieldName="range" />
      <dsv-form-signal-input [form]="myForm" type="datetime-local" fieldName="date" />
      <dsv-form-signal-input [form]="myForm" type="textarea" fieldName="textarea" />
      <dsv-form-signal-select [form]="myForm" fieldName="select" [list]="[{id: '', name: ''}, {id: '1', name: 'Test'}]" />
      <dsv-form-signal-checkbox [form]="myForm" fieldName="checkbox" />
    </app-form-signal>
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
  myForm = form(signal({
    name: '',
    email: '',
    number: 0,
    range: 50,
    date: '',
    textarea: '',
    select: '',
    checkbox: false,
  }), path => {
    required(path.name);
    minLength(path.name, 2);
    maxLength(path.name, 10);
    required(path.email);
    pattern(path.email, /^\w+@gmail.com$/, { message: "L'email doit se terminer par gmail.com" });
    email(path.email);
    required(path.textarea);
    required(path.select);
  });

  urlBack?: string;
  callback = (data: JSONValue) => {
    console.log(data);
  }
}

const meta: Meta<StoryWrapperComponent> = {
  title: 'dsv/Form/Signal',
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
          <app-form-signal [form]="myForm" urlBack="urlBack" (callback)="callback($event)">
            <dsv-form-signal-input [form]="myForm" fieldName="name" />
            <dsv-form-signal-input [form]="myForm" type="email" fieldName="email" />
            <dsv-form-signal-input [form]="myForm" type="number" fieldName="number" />
            <dsv-form-signal-input [form]="myForm" type="range" fieldName="range" />
            <dsv-form-signal-input [form]="myForm" type="datetime-local" fieldName="date" />
            <dsv-form-signal-input [form]="myForm" type="textarea" fieldName="textarea" />
            <dsv-form-signal-select [form]="myForm" fieldName="select" [list]="[{id: '', name: ''}, {id: '1', name: 'Test'}]" />
            <dsv-form-signal-checkbox [form]="myForm" fieldName="checkbox" />
          </app-form-signal>

          
          class FormComponent {
            myForm = form(signal({
              name: '',
              email: '',
              number: 0,
              range: 50,
              date: '',
              textarea: '',
              select: '',
              checkbox: false,
            }), path => {
              required(path.name);
              minLength(path.name, 2);
              maxLength(path.name, 10);
              required(path.email);
              pattern(path.email, /^\w+@gmail.com$/, { message: "L'email doit se terminer par gmail.com" });
              email(path.email);
              required(path.textarea);
              required(path.select);
            });

            urlBack?: string;
            callback = (data: JSONValue) => {
              console.log(data);
            }
          }
        `,
      },
    },
  },
};