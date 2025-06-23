import { storyBig } from '@ng-vagabond-lab/ng-dsv/type';
import { TranslatePipe } from '@ngx-translate/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ModalButtonComponent } from '../public-api';
import { ModalComponent } from './modal.component';

export const ActionsData = {
  id: 'modale',
  title: 'title',
  class: 'class',
};

const meta: Meta<ModalComponent> = {
  title: 'dsv/Modal',
  component: ModalComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ModalButtonComponent, TranslatePipe],
    }),
    storyBig
  ],
  argTypes: {},
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Default: Story = {
  args: {},
  render: (args: any) => ({
    template: `
      <app-modal-button id="${args.id}" text="Clic">
        <app-modal id="${args.id}" titleText="${args.title}" class="${args.class}">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, but also the leap into electronic typesetting, 
          remaining essentially unchanged. It was popularised in the 1960s with the release of 
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
          publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </app-modal>
      </app-modal-button>
    `,
  }),
};
