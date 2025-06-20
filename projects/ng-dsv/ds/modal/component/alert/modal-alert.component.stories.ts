import { TranslatePipe } from '@ngx-translate/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ModalButtonComponent } from '../button/modal-button.component';
import { ModalAlertComponent } from './modal-alert.component';

export const ActionsData = {
  id: 'modale',
  title: 'title',
  text: 'text',
  button: 'oui',
  buttonClose: 'non',
};

const meta: Meta<ModalAlertComponent> = {
  title: 'dsv/Modal/alert',
  component: ModalAlertComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ModalButtonComponent, TranslatePipe],
    }),
  ],
  argTypes: {},
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<ModalAlertComponent>;

export const Default: Story = {
  args: {},
  render: (args: any) => ({
    template: `
      <app-modal-button id="${args.id}" text="Clic">
        <app-modal-alert 
          id="${args.id}" 
          title="${args.title}" 
          text="${args.text}" 
          button="${args.button}" 
          buttonClose="${args.buttonClose}" 
          (callback)="${args.callback}">
        </app-modal-alert>
      </app-modal-button>
    `,
  }),
};
