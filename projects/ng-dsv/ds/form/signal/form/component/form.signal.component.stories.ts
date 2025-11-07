import { Component, signal } from '@angular/core';
import { form, required } from '@angular/forms/signals';
import { JSONValue } from '@ng-vagabond-lab/ng-dsv/api';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormSignalInputComponent } from '../../public-api';
import { FormSignalComponent } from './form.signal.component';

export const ActionsData = {
  urlBack: '/',
};

@Component({
  selector: 'storybook-wrapper',
  standalone: true,
  imports: [FormSignalComponent, FormSignalInputComponent],
  template: `
    <app-form-signal [form]="myForm" urlBack="urlBack" (callback)="callback($event)">
      <dsv-form-signal-input [form]="myForm" fieldName="name" />
      <dsv-form-signal-input [form]="myForm" type="number" fieldName="number" />
      <dsv-form-signal-input [form]="myForm" type="range" fieldName="range" />
      <dsv-form-signal-input [form]="myForm" type="datetime-local" fieldName="date" />
      <dsv-form-signal-input [form]="myForm" type="textarea" fieldName="textarea" />
      <!-- <dsv-form-select [form]="form" field="select" [list]="[{id: '', name: ''}, {id: '1', name: 'Test'}]" />
      <dsv-form-checkbox [form]="form" field="checkbox" /> -->
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
    number: 0,
    range: 50,
    date: '',
    textarea: '',
  }), path => {
    required(path.name);
  });

  urlBack?: string;
  callback = (data: JSONValue) => {
    console.log(data);
    alert('Callback appelé 🎉');
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
          <app-form-signal urlBack="urlBack" (callback)="callback($event)">
            <dsv-form-signal-input [form]="myForm" fieldName="name" />
            <dsv-form-signal-input [form]="myForm" type="number" fieldName="number" />
            <dsv-form-signal-input [form]="myForm" type="range" fieldName="range" />
            <dsv-form-signal-input [form]="myForm" type="datetime-local" fieldName="date" />
            <dsv-form-signal-input [form]="myForm" type="textarea" fieldName="textarea" />
            <!-- <dsv-form-select [form]="form" field="select" [list]="[{id: '', name: ''}, {id: '1', name: 'Test'}]" />
            <dsv-form-checkbox [form]="form" field="checkbox" /> -->
          </app-form-signal>
        `,
      },
    },
  },
};