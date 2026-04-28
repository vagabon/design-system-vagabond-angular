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
        <div style="height: 300px">
            <dsv-modal-button modalName="${args.id}" text="Clic">
                <dsv-modal-alert 
                    id="${args.id}" 
                    titleText="${args.title}" 
                    text="${args.text}" 
                    button="${args.button}" 
                    buttonClose="${args.buttonClose}" 
                    (callback)="${args.callback}">
                </dsv-modal-alert>
            </dsv-modal-button>
        </div>
        `,
    }),
};
