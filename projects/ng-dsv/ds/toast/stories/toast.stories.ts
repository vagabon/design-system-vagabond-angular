import { Component } from '@angular/core';
import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { DsvButtonComponent } from '../../button';
import { DsvToastComponent } from '../component/toast.component';
import { ToastType } from '../dto/toast.dto';
import { ToastService } from '../service/toast.service';

export const ActionsData = {};

const meta: Meta<DsvToastComponent> = {
  title: 'dsv/Toast',
  component: DsvToastComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<DsvToastComponent>;

@Component({
  selector: 'toast-button-demo',
  imports: [DsvButtonComponent],
  template: `
    <div class="flex">
      <dsv-button
        color="success"
        (callback)="click()"
        icon="ri-check-fill"
        libelle="Success"
      ></dsv-button>
      <dsv-button
        color="info"
        (callback)="click('info')"
        icon="ri-information-2-line"
        libelle="Info"
      ></dsv-button>
      <dsv-button
        color="warning"
        (callback)="click('warning')"
        icon="ri-alert-line"
        libelle="Warning"
      ></dsv-button>
      <dsv-button
        color="error"
        (callback)="click('error')"
        icon="ri-close-line"
        libelle="Error"
      ></dsv-button>
    </div>
  `,
})
class PrimaryButtonDemo {
  constructor(private readonly toastService: ToastService) {}

  click(type: ToastType = 'success') {
    this.toastService.showToast({ text: 'test', type: type });
  }
}

export const Default: Story = {
  args: {},
  decorators: [
    moduleMetadata({
      imports: [PrimaryButtonDemo],
    }),
    componentWrapperDecorator((story) => {
      return `<div style="height: 30vh"><toast-button-demo />${story}</div>`;
    }),
  ],
};
